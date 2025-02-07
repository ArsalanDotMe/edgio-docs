import {readFile} from 'fs/promises';
import {join} from 'path';

import {isEdgioRunDev, isProductionBuild} from '@edgio/core/environment';
import globby from 'globby';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';

import {remarkPlugins} from '../../../plugins/markdownToHtml';
import rehypeExtractHeadings from '../../../plugins/rehype-extract-headings';
import {MDXComponents} from '../../components/MDX/MDXComponents';
import {getVersionedConfig} from '../../utils/config';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import logger from 'utils/logging';
import templateReplace from 'utils/templateReplace';
import {MDHeadingsList} from 'utils/Types';

const guidesPath = 'src/guides';
const pagesPath = 'src/pages';

export default function VersionedGuide({
  source,
  headings,
  version,
}: {
  source: any;
  headings: MDHeadingsList;
  version: string;
}) {
  return (
    <Page>
      <MarkdownPage meta={{...source.frontmatter, version}} headings={headings}>
        <MDXRemote {...source} components={MDXComponents} />
      </MarkdownPage>
    </Page>
  );
}

export const getStaticPaths = async () => {
  const routes = [];
  const paths = [];

  // determine available versions from config files
  // const versions = (
  //   await globby('config/v*.config.js', {
  //     cwd: join(process.cwd(), 'src'),
  //   })
  // ).map(async (file: string) => {
  //   const v = (file.match(/v(\d+)\.config\.js/) || [])[1];

  //   return {
  //     version: v,
  //   };
  // });

  // const versionObjects = await Promise.all(versions);

  // determine available guides from filesystem
  const allGuides = (
    await globby(['guides/**/*.{md,mdx}'], {
      cwd: join(process.cwd(), 'src'),
    })
  ).map(
    (path: string) =>
      path
        .replace('guides/', '') // remove guides/ prefix
        .replace(/.mdx?/, '') // remove extension
  );

  // guides without version-specific override
  const baseGuides = allGuides.filter((path: string) => !path.match(/^v\d+/));

  // Across the different versions and different guides, we need routes
  // in the following formats:
  // /guides/[guide] => guide for the latest version
  // /guides/[version] => homepage for the version
  // /guides/[version]/[guide] => guide for the version

  // guides for the latest version
  // paths.push(...baseGuides);

  // in dev mode, don't prerender any pages and fallback to SSR for
  // faster page loads
  if (isEdgioRunDev()) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  // Prerendered page logic below. However, because some of the guides define
  // redirects, redirects cannot be prerendered and must be handled by SSR.
  // Therefore, we disable prerendering for now and fallback to SSR for all.
  return {
    paths: [],
    fallback: 'blocking',
  };

  // prerender guides for the latest version only; previous versions will
  // fallback to SSR
  // const version = `v${process.env.NEXT_PUBLIC_LATEST_VERSION}`;
  // paths.push(
  //   ...[
  //     version, // version homepage
  //     ...baseGuides.map((path) => join(version, path)), // versioned base guides
  //     ...allGuides.filter((path) => path.startsWith(version)), // versioned overrides
  //   ]
  // );

  // // convert paths to routes
  // routes.push(
  //   ...[...new Set(paths)].map((path) => ({params: {slug: path.split('/')}}))
  // );

  // if (isProductionBuild()) {
  //   logger.prod(JSON.stringify(paths));
  // }

  // // in the end, only routes matching `/guides/v7/*` will be prerendered
  // // and the rest (eg. /guides/v6/*) will fallback to SSR
  // return {
  //   paths: routes,
  //   fallback: 'blocking',
  // };
};

export async function getStaticProps({params}: {params: any}) {
  const {slug}: {slug: string[]} = params;
  const latestVersion = process.env.NEXT_PUBLIC_LATEST_VERSION as string; // defined in next.config.js
  const versionRE = /^v(\d+)$/;
  let [version, ...guide] = slug;
  let isHomepage = false;
  const isVersionSpecifiedInSlug = versionRE.test(version);

  if (!isVersionSpecifiedInSlug) {
    // no version specified in the path, so redirect to the latest version path
    return {
      redirect: {
        destination: `/guides/v${latestVersion}/${slug.join('/')}`,
        permanent: true,
      },
    };
  } else if (!guide || !guide.length) {
    // version with no remainig guide path so use as homepage
    isHomepage = true;
    guide = ['index'];
  }

  const slugAsString = guide.join('/');

  const guideGlobs = ['md', 'mdx'].flatMap((ext) => [
    `${guidesPath}/${version}/${slugAsString}.${ext}`,
    `${guidesPath}/${slugAsString}.${ext}`,
  ]);

  const files = (await globby(guideGlobs)).sort((a, b) => {
    // prioritize versioned files over non-versioned files
    if (a.match(versionRE) && !b.match(versionRE)) {
      return -1;
    }
    if (!a.match(versionRE) && b.match(versionRE)) {
      return 1;
    }
    return 0;
  });

  const [file] = files;
  if (!file) {
    logger.warn(`No matching files for route '${slugAsString}'`);
    return {notFound: true};
  }

  logger.dev(
    `Using '${file}' for route '${slugAsString}'. Available files:`,
    files
  );

  // update template with versioned constants
  let content =
    templateReplace(join(process.cwd(), file), getVersionedConfig(version)) ??
    `Invalid template file: ${file}`;

  // remove any html comments (<!-- -->) as these will not parse correctly
  content = content.replace(/<!--([\s\S]*?)-->/g, '');

  // <edgejs> tags are used for external documentation and should be removed
  content = content.replace(/<edgejs([\s\S]*?)edgejs>/g, '');

  const headings: MDHeadingsList = [];
  const mdxSource = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins,
      rehypePlugins: [[rehypeExtractHeadings, {headings}]],
      format: 'mdx',
    },
  });

  if (mdxSource.frontmatter?.redirect) {
    return {
      redirect: {
        destination: mdxSource.frontmatter.redirect,
        permanent: false,
      },
    };
  }

  return {props: {source: mdxSource, headings, version}};
}

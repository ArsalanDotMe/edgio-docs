import {isLocal} from '@edgio/core/environment';
import {Router} from '@edgio/core/router';
import {Features} from '@edgio/core/types';
import {nextRoutes} from '@edgio/next';
import {load} from 'cheerio';
import {Downloader as GithubDownloader} from 'github-download-directory';
import semverMaxSatisfying from 'semver/ranges/max-satisfying';

import {DOCS_PAGES_DOMAIN} from './constants';
import {
  scriptSrcDomains,
  connectSrcDomains,
  imgSrcDomains,
  frameSrcDomains,
  styleSrcDomains,
  fontSrcDomains,
  mediaSrcDomains,
} from './edgio/cspDomains';
import {archiveRoutes} from './edgio/plugins/ArchiveRoutes';
import redirects from './edgio/redirects';

const defaultFeatures: Features = {
  caching: {
    max_age: '1d',
    stale_while_revalidate: '1d',
    service_worker_max_age: '1h',
  },
};

const router = new Router()
  .match('/(.*)', {
    ...defaultFeatures,
    headers: !isLocal()
      ? {
          set_response_headers: {
            'Strict-Transport-Security':
              'max-age=31536000; includeSubDomains; preload',
            'Content-Security-Policy': [
              `default-src 'self'`,
              `style-src 'unsafe-inline' 'self' ${styleSrcDomains.join(' ')}`,
              `font-src ${fontSrcDomains.join(' ')}`,
              `img-src 'self' ${imgSrcDomains.join(' ')}`,
              `frame-src ${frameSrcDomains.join(' ')}`,
              `script-src 'unsafe-inline' 'self' 'unsafe-eval' ${scriptSrcDomains.join(
                ' '
              )}`,
              `base-uri 'self'`,
              `frame-ancestors 'self'`,
              `media-src ${mediaSrcDomains.join(' ')}`,
              `connect-src ${connectSrcDomains.join(' ')}`,
            ].join('; '),
            'X-XSS-Protection': '1; mode=block',
          },
          remove_origin_response_headers: ['cache-control'],
        }
      : {},
  })

  // google verification
  .match('/googlea13e5ef2a6ea3f29.html', {
    ...defaultFeatures,
    response: {
      set_response_body:
        'google-site-verification: googlea13e5ef2a6ea3f29.html',
      set_done: true,
    },
  });

// plugins
// Note: nextRoutes needs to be before compute since both go to the serverless
// origin. Otherwise the catch-all route in nextRoutes will override what was
// already attempted to be computed
router
  .use(nextRoutes)

  .use(
    archiveRoutes.addRoute(
      '/archive/github/:owner/:repo/:path*',
      async (req: any) => {
        const {owner, repo, path} = req.params || {};
        const downloader = new GithubDownloader({
          github: {auth: process.env.GH_API_TOKEN},
        });

        const flatPath = (path as string[]).join('/');
        // TODO: something has changed between v6 and v7 (or a related dependency)
        // that causes the path to be incorrectly encoded when making the GitHub API request.
        // (eg. https://api.github.com/repos/edgio/edgiowordpress/contents/wp-content%2Fplugins%2Fedgio)
        // For now, this feature will not work for the WordPress plugin download.
        try {
          const result = await downloader.fetchFiles(owner, repo, flatPath);
          return result.map(({path, contents}) => ({
            path: path.split(flatPath)[1],
            data: contents,
          }));
        } catch (e) {
          console.error(e);
          return [];
        }
      }
    )
  );

//  -- API docs --
// proxy /docs/versions to the version list
router.match('/docs/versions', {
  origin: {
    set_origin: 'api',
  },
  url: {
    url_rewrite: [
      {
        source: '/docs/versions',
        destination: '/versions.csv',
      },
    ],
  },
});

// API docs caching
router.match('/docs/:path*', {
  ...defaultFeatures,
});

// proxy v?.x api docs to the latest version
[3, 4, 5, 6, 7].forEach((v) => {
  // proxy /docs/v?.x to the latest version
  router.match(`/docs/v${v}.x/:path*`, ({compute}) => {
    compute(async (req, res) => {
      // fetch the list of current published versions
      const versions = await (
        await fetch('https://docs.edg.io/docs/versions')
      ).text();

      const targetVersion = semverMaxSatisfying(
        versions.replace(/\n/g, '').split(','),
        `v${v}.x`
      );

      let targetPath = req.path.replace(`/docs/v${v}.x`, `/${targetVersion}`);
      const lastPathSegment = targetPath.split('/').reverse()[0];
      const hasTrailingSlash = targetPath.endsWith('/');
      const hasFileExtension = lastPathSegment.includes('.');
      const slashSeparator = hasTrailingSlash ? '' : '/';

      // set path to index.html if it doesn't end with a file extension
      if (!hasFileExtension) {
        targetPath = targetPath + slashSeparator + 'index.html';
      }

      const upstreamRes = await fetch(
        `https://${DOCS_PAGES_DOMAIN}${targetPath}`
      );
      const upstreamResBody = await upstreamRes.text();
      res.setHeader('content-type', upstreamRes.headers.get('content-type'));
      res.body = upstreamResBody;

      // due to relative paths in the response, if the path doesn't end with a trailing
      // slash (eg. /api/core), then assets will be requested from the wrong path (eg. /api/assets/...)
      // so we need to rewrite the paths to include the last path segment
      if (!hasTrailingSlash && !hasFileExtension) {
        const $ = load(upstreamResBody ?? '');

        // prepend ${lastPathSegment} to all elements with an href or src attribute
        $('*[href], *[src]').each((i, el) => {
          const $el = $(el);
          const href = $el.attr('href');
          const src = $el.attr('src');

          if (href) {
            $el.attr('href', `${lastPathSegment}/${href}`);
          }

          if (src) {
            $el.attr('src', `${lastPathSegment}/${src}`);
          }
        });

        res.body = $.html();
      }
    });
  });
});

// redirects
redirects.forEach(([from, to, statusCode]) => {
  router.match(from, ({redirect}) =>
    redirect(to, {statusCode: Number(statusCode || 301)})
  );
});

// error handling
// router.catch(/^4.*/, {
//   response: {
//     set_status_code: 302,
//   },
//   headers: {
//     set_response_headers: {
//       location: '%{scheme}://%{host}/',
//     },
//   },
//   url: {
//     follow_redirects: true,
//   },
// });

export default router;

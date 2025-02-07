const COMPANY_NAME = 'Edgio';
const PRODUCT_NAME = 'Edgio';
const PRODUCT = 'Edgio';
const PRODUCT_LEGACY = 'Layer0';
const PRODUCT_EDGE = 'Performance';
const PRODUCT_PLATFORM = 'Sites';
const PRODUCT_SECURITY = 'Security';
const PRODUCT_NAME_LOWER = PRODUCT_LEGACY.toLowerCase();
const PRODUCT_NAME_UPPER = PRODUCT_LEGACY.toUpperCase();
const CLI_NAME = '0';
const FULL_CLI_NAME = 'layer0';
const PACKAGE_NAME = '@layer0';
const CONFIG_FILE = 'layer0.config.js';
const HEADER_PREFIX = 'x-0';
const COOKIE_PREFIX = 'layer0';
const RUM_NS = 'Layer0'; // namespace for the JS package used by RUM

const DOMAIN = 'layer0.co';
const APP_DOMAIN = `app.${DOMAIN}`;
const DOCS_DOMAIN = `docs.${DOMAIN}`;
const DOCS_PAGES_DOMAIN = 'layer0-docs.s3.amazonaws.com';
const DOCS_REPO = 'layer0-docs/layer0-docs';
const EXAMPLES_REPO = 'layer0-docs/layer0-examples';

const WWW_URL = `https://www.${DOMAIN}`;
const APP_URL = `https://${APP_DOMAIN}`;
const FORUM_URL = `https://forum.edg.io`;
const FIDDLE_URL = `https://fiddle.${DOMAIN}`;
const STATUS_URL = `https://status.edg.io`;
const HELP_URL = `https://help.${DOMAIN}`;
const SUPPORT_URL = `${APP_URL}/help`;
const DOCS_URL = `https://${DOCS_DOMAIN}`;
const DOCS_PAGES_REPO_URL = `https://${DOCS_PAGES_DOMAIN}`;
const LOGIN_URL =
  'https://app.layer0.co/?sgId=ef4d5169-93f2-4f55-aabb-dc3be4286e1f';

const NODE_VERSION = '14.x';
const STARTER_NAME = 'layer0-app';
const EDGEJS_LABEL = 'EdgeJS';

const EXAMPLES_REPOS = {
  angular: 'https://github.com/layer0-docs/layer0-angular-example',
  astro: 'https://github.com/layer0-docs/layer0-astro-example',
  cdn: 'https://github.com/layer0-docs/layer0-cdn-example',
  fastboot: 'https://github.com/layer0-docs/layer0-ember-fastboot-example',
  frontity: 'https://github.com/layer0-docs/layer0-frontity-example',
  gatsby: 'https://github.com/layer0-docs/layer0-gatsby-example',
  next: 'https://github.com/layer0-docs/layer0-nextjs-example',
  nextcommerce: 'https://github.com/layer0-docs/layer0-nextjs-commerce-example',
  nuxt: 'https://github.com/layer0-docs/layer0-nuxt-example',
  nx: 'https://github.com/layer0-docs/layer0-nx-example',
  razzle: 'https://github.com/layer0-docs/layer0-razzle-example',
  sapper: 'https://github.com/layer0-docs/layer0-sapper-example',
  spartacus: 'https://github.com/layer0-docs/layer0-spartacus-example',
  svelte: 'https://github.com/layer0-docs/layer0-svelte-example',
  vsf: 'https://github.com/layer0-docs/layer0-vue-storefront-example',
  'static-backbone': 'https://github.com/layer0-docs/static-backbonejs-example',
  'static-react': 'https://github.com/layer0-docs/layer0-static-react-example',
  'static-vue': 'https://github.com/layer0-docs/layer0-static-vuejs-example',
};

const SIGN_UP = `## Sign up for ${PRODUCT} {/*sign-up*/}

Deploying requires an account on ${PRODUCT}. <a href="${APP_URL}/signup">Sign up here for free.</a>`;

const INSTALL_CLI_STEP = `Install the ${PRODUCT_NAME} CLI

If you have not already done so, install the [${PRODUCT_NAME} CLI](cli).

With \`npm\`: 
\`\`\`bash
npm i -g ${PACKAGE_NAME}/cli
\`\`\`

With \`yarn\`:
\`\`\`bash
yarn global add ${PACKAGE_NAME}/cli
\`\`\`
`;

const PARTNERS_CONTACT = `partner@llnw.com`;

const config = {
  COMPANY_NAME,
  PRODUCT,
  PRODUCT_LEGACY,
  PRODUCT_EDGE,
  PRODUCT_PLATFORM,
  PRODUCT_SECURITY,
  PRODUCT_NAME,
  PRODUCT_NAME_LOWER,
  PRODUCT_NAME_UPPER,
  APP_DOMAIN,
  APP_URL,
  CLI_NAME,
  CONFIG_FILE,
  COOKIE_PREFIX,
  DOCS_DOMAIN,
  DOCS_PAGES_DOMAIN,
  DOCS_PAGES_REPO_URL,
  DOCS_REPO,
  DOCS_URL,
  DOMAIN,
  EDGEJS_LABEL,
  EXAMPLES_REPO,
  EXAMPLES_REPOS,
  FIDDLE_URL,
  FORUM_URL,
  FULL_CLI_NAME,
  HEADER_PREFIX,
  HELP_URL,
  LOGIN_URL,
  INSTALL_CLI_STEP,
  NODE_VERSION,
  PACKAGE_NAME,
  PARTNERS_CONTACT,
  SIGN_UP,
  STARTER_NAME,
  STATUS_URL,
  SUPPORT_URL,
  WWW_URL,
  RUM_NS,
};

export default config;

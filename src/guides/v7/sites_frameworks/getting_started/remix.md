---
title: Remix
---

<Callout type="warning">

  This article is incompatible with [recent Remix changes](https://remix.run/docs/en/1.18.1/pages/technical-explanation#http-handler-and-adapters). We plan on updating this article to work with the latest version of Remix. In the meantime, contact your account manager or our [sales department](https://edg.io/contact-us/) at 1 (866) 200 - 5463 to get started with Remix.

</Callout>

This guide shows you how to deploy a [Remix](https://remix.run/) application to {{ PRODUCT }}.

<!-- ## Example {/*example*/}

<ExampleButtons
  title="Remix Express"
  siteUrl="https://layer0-docs-layer0-remix-express-example-default.layer0-limelight.link"
  repoUrl="https://github.com/edgio-docs/edgio-remix-express-example" 
  deployFromRepo /> -->

{{ PREREQ.md }}

## Create a new Remix app {/*create-a-new-remix-app*/}

If you don't already have a Remix app, create one by running the following:

```bash
npx create-remix@latest
# Choose express server
cd project-name
```

You can verify your app works by running it locally with:

```bash
npm run dev
```

## Configuring your Remix app for {{ PRODUCT }} {/*configuring-your-remix-app-for*/}

### Initialize your project {/*initialize-your-project*/}

In the root directory of your project run `{{ FULL_CLI_NAME }} init`:

```bash
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }}
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT }}
- `routes.js` - A default routes file that sends all requests to Remix.

<a id="install-express"></a>

### Install {{ PACKAGE_NAME }}/express {/*install-express*/}

Install {{ PACKAGE_NAME }}/express by running the following:

```bash
npm install -D {{ PACKAGE_NAME }}/express
```

### Update {{ PRODUCT }} Configuration {/*update-configuration*/}

Update `{{ CONFIG_FILE }}` at the root of your project to the following:

```js
// This file was automatically added by {{ FULL_CLI_NAME }} deploy.
// You should commit this file to source control.
module.exports = {
  connector: '{{ PACKAGE_NAME }}/express',
  express: {
    appPath: './server/index.js',
  },
  serverless: {
    include: ['public'],
  },
}
```

### Configure the routes {/*configure-the-routes*/}

Update `routes.js` at the root of your project to the following:

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.
const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR

const { Router } = require('@{{ PACKAGE_NAME }}/core/router')

module.exports = new Router()
  .match('/:path*', ({ renderWithApp }) => {
    renderWithApp()
  })
  .match('/', ({ cache, renderWithApp }) => {
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
      },
      browser: false,
    })
    renderWithApp()
  })
```

Refer to the [CDN-as-code](/guides/performance/cdn_as_code) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Remix app locally on {{ PRODUCT }} {/*run-the-remix-app-locally-on*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Run {{ PRODUCT }} on your local machine:

```bash
{{ FULL_CLI_NAME }} run --production
```

Load the site http://127.0.0.1:3000

## Deploying {/*deploying*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

Refer to the [Deployments](/guides/basics/deployments) guide for more information on the `deploy` command and its options.

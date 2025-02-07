---
title: Custom Connector
---

Custom Connector lets you build and deploy your project to {{ PRODUCT }} for any framework that is not listed under our directly [supported frameworks](/guides/sites_frameworks/getting_started#supported-frameworks).

{{ PREREQ.md }}

<!-- ## Why Custom Connector {/* why-custom-connector */} -->

## Using Custom Connector {/* using-custom-connector */}

To use the Custom Connector with your project, you'll first need to initialize your project using the {{ PRODUCT }} CLI with the following:

```bash
{{ CLI_CMD(init) }}
```

By default {{ PRODUCT }} will try to recognize the underlying framework when you run the `{{ CLI_CMD(init) }}` command. However, if the framework you are using does not fall within the list of [supported frameworks](/guides/sites_frameworks/getting_started#supported-frameworks), you will be prompted to select the type of project you want to set up:

```bash
WARNING: No framework detected. You can still use {{ PRODUCT }}, we just need more information about your project
? What kind of project do you want to set up? › - Use arrow-keys. Return to submit.
❯   {{ PRODUCT }} Sites (Web-app hosting)
    {{ PRODUCT }} Performance (CDN-as-code)
```

Choose `{{ PRODUCT }} Sites (Web-app hosting)` from the list of options to prepare the project for Custom Connector.

Next, you will be prompted to enter more information specific to your project and framework:

  - `What is the build directory of your app?` - This is the output directory where all of your framework's build files are located. A common build directory is `dist`, but this may vary depending on your framework.
  - `What is the entry file of your app?` - This is the entry file of your app. A common entry file is `index.js`, but this may vary depending on your framework.
  - `What is the envirovment variable name for port (if it is available)?` - This is the name of the environment variable for setting the port the project will run on. Note: many frameworks use `PORT` as the default environment variable name for port. {{ PRODUCT }} will pass the port value to your app via the environment variable specified here.
  - `Please specify build command if exists` - This is the build command of your app. The build command will be used when you run the `{{ CLI_CMD(build) }}` command.
  - `Please specify dev command if exists` - This is the command to run the local development server of your app. The dev command will be used when you run the `{{ CLI_CMD(dev) }}` command.
  - `Please specify dev ready message or timeout value in seconds to wait` - This is the message (or timeout seconds) that will be used to determine when the local development server is ready to accept requests. For example, the development server may print a message like `Server is listening on port 3000` when it is ready to accept requests. In this case, you could enter `listening on` as the dev ready message. If the development server does not print a message when it is ready, you can enter the number of seconds to wait before the development server is ready to accept requests.

```plain
✔ What is the build directory of your app? … dist
✔ What is the entry file of your app … index.js
✔ What is the envirovment variable name for port (if it is available)? … PORT
✔ Please specify build command if exists … custom_fw build
✔ Please specify dev command if exists … custom_fw dev
✔ Please specify dev ready message or timeout value in seconds to wait › 5
```

When initialization process is finished, {{ PRODUCT }} will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/cli` package
- The `{{ PACKAGE_NAME }}/custom-connector` package
- `{{ CONFIG_FILE }}` - Contains various configuration options for {{ PRODUCT }} including the connector [configuration](#custom-connector-configuration).
- `routes.js` - A default routes file that sends all requests to the underlaying framework. Update this file to add caching or proxy some URLs to a different origin.

## Routing {/* routing */}

The default `routes.js` file created by `{{ CLI_CMD(init) }}` sends all requests to your framework's server.

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

const {Router} = require('{{ PACKAGE_NAME }}/core/router');
const {customRoutes} = require('{{ PACKAGE_NAME }}/custom-connector');

export default new Router().use(customRoutes);
```

See [Routes](/guides/performance/cdn_as_code#routes) for information on defining routes, caching, and more.

## Running Locally {/* running-locally */}

To test your app locally, run:

```bash
{{ CLI_CMD(dev) }}
```

You can do a production build of your app and test it locally using:

```bash
{{ CLI_CMD(build) }} && {{ CLI_CMD(run --production) }}
```

Setting `--production` runs your app exactly as it will be when deployed to the {{ PRODUCT }} cloud.

## Deploy to {{ PRODUCT }} {/* deploy-to */}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following commands in your project's root directory:

```bash
{{ CLI_CMD(deploy) }}
```

See [Deployments](/guides/basics/deployments) for more information.

## Custom Connector Configuration {/* custom-connector-configuration */}

After you initialize your project with the `{{ CLI_CMD(init) }}` command, {{ PRODUCT }} will create a `{{ CONFIG_FILE }}` file in your project's root directory. In the `{{ CONFIG_FILE }}` file you can configure your Custom Connector.

```json
{
  // rest of the config

  "customConnector": {
    "buildFollder" : "dist",
    "entryFile": "index.js",
    "envPort": "PORT",
    "buildCommand": "custom_fw build",
    "devCommand": "custom_fw dev",
    "devReadyMessageOrTimeout": 5,
  }
}
```

In the `customConnector` object you can configure the following options:

- `buildFolder` - The build output folder of your app. Default value is `dist`.
- `entryFile` - The entry file of your app. Default value is `index.js`.
- `envPort` - The environment variable name for port (if it is available). Default value is `PORT`. Note: many frameworks use `PORT` as the default environment variable name for port. {{ PRODUCT }} will pass the port value to your app via the environment variable specified here
- `buildCommand` - The build command of your app. Default value is an empty string. This command is used when you run `{{ FULL_CLI_NAME }} build` command.
- `devCommand` - The dev command of your app. Default value is an empty string. This command is used when you run `{{ FULL_CLI_NAME }} dev` command.
- `devReadyMessageOrTimeout` - A message to be printed when dev server is ready or timeout value in seconds to wait. Default value is `0`.

## Connector {/* connector */}

This connector is not built for a specific framework, it is used as a fallback for frameworks that are not directly supported by {{ PRODUCT }}. See [Connectors](/guides/sites_frameworks/connectors) for more information.

<ButtonLink
  variant="stroke"
  type="code"
  withIcon={true}
  href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-custom-connector">
  View the Connector Code
</ButtonLink>

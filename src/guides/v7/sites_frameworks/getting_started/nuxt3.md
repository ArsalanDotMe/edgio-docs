---
title: Nuxt3
---

This guide shows you how to deploy a [Nuxt3](https://v3.nuxtjs.org) application to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="Nuxt3"
  siteUrl="https://edgio-community-examples-v7-nuxt3-live.edgio.link/"
  repoUrl="https://github.com/edgio-docs/edgio-v7-nuxt3-example" 
  deployFromRepo />

{{ PREREQ.md }}

## Getting Started {/*getting-started*/}

Follow the instructions to create a new Nuxt3 application, run it in a local dev server, and deploy to {{ PRODUCT }}.

#### 1. Create a new Nuxt3 application {/*1-create-a-new-nuxt3-application*/}

To create a new Nuxt3 application, run:

```bash
npx nuxi init <app-name>
```

Learn more about [npx](https://docs.npmjs.com/cli/v9/commands/npx) and [Creating a new Nuxt3 project](https://v3.nuxtjs.org/getting-started/installation#new-project).

After the installation is complete, change directory to the new project:

```bash
cd <app-name> // Change to the directory of your new application
```

Then install dependencies with the command:

```bash
npm install # yarn install
```

#### 2. Add {{ PRODUCT }} to the Nuxt3 application {/*2-add-to-the-nuxt3-application*/}

To add {{ PRODUCT }} to the Nuxt3 application, run:

```bash
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }}
```

#### 3. Run the Nuxt3 app locally with {{ PRODUCT }} {/*3-run-the-nuxt3-app-locally-with*/}

To run the Nuxt3 app locally with {{ PRODUCT }}, run:

```bash
{{ FULL_CLI_NAME }} dev
```

Vist [http://localhost:3000](http://localhost:3000) to view the application.

#### 4. Run the Nuxt3 app in local production mode with {{ PRODUCT }} {/*4-run-the-nuxt3-app-in-local-production-mode-with*/}

To run the Nuxt3 app in local production mode with {{ PRODUCT }}, run:

```bash
{{ FULL_CLI_NAME }} build && {{ FULL_CLI_NAME }} run --production
```

#### 5. Deploy the Nuxt3 app to {{ PRODUCT }} {/*5-deploy-the-nuxt3-app-to*/}

Deploy your app to {{ PRODUCT }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

See [Deployments](/guides/basics/deployments) for more information.

### Resources {/*resources*/}
1. [Routing with EdgeJS](/guides/performance/cdn_as_code)
2. [Prefetching with EdgeJS](/guides/performance/prefetching)

## Troubleshoot {/*troubleshoot*/}

#### Error: Variable siteSlug of type String! was provided invalid value {/*error-variable-siteslug-of-type-string-was-provided-invalid-value*/}

This error throws on deployment with `{{ FULL_CLI_NAME }} deploy`. To fix this:
- Add/Update the `name` field in the `package.json` file, OR
- Deploy with the name flag, via, `{{ FULL_CLI_NAME }} deploy --name=site-slug`

#### tsconfig.json:3:13: warning: Cannot find base config file "./.nuxt/tsconfig.json" {/*tsconfigjson313-warning-cannot-find-base-config-file-nuxttsconfigjson*/}

This is a resolved Nuxt3 error. More on [this GitHub Issue](https://github.com/nuxt/framework/issues/1912).

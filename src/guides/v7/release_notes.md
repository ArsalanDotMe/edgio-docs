---
title: {{ PRODUCT }} Release Notes
---

<Callout type="info">

This page contains release notes related to the {{ PORTAL_LINK }}.

See [NPM Packages Changelog](/guides/changelog) for release notes related to the  {{ PRODUCT }} CLI packages and connectors.

</Callout>

## June 2023

| Date  | Description                                                                                                                            |
|------------|----------------------------------------------------------------------------------------------------------------------------------------|
| 6/20/2023  | **Origins:** <ul><li>Added [round-robin load balancing mode](/guides/basics/hostnames_and_origins#load-balancing) for hosts defined within an origin configuration.</li></ul> **Rules:** <ul><li>Added the [HTML Preferred DTD (html_preferred_dtd) match condition](/guides/performance/rules/conditions#html-preferred-dtd).</li></ul>   |
| 6/2/2023   | **{{ PRODUCT }} {{ PRODUCT_PLATFORM }}:** <ul><li>Support for [30+ web application frameworks](/guides/v7/sites_frameworks/getting_started#supported-frameworks).</li></ul> **Rules:** <ul><li>Added [Directory (directory)](/guides/performance/rules/conditions#directory) and [Extension (extension)](/guides/performance/rules/conditions#extension) match conditions.</li></ul> **{{ DOCS_NAME }}:** <ul><li>Migrated Layer0 documentation (https://docs.layer0.co) to `https://docs.edg.io/guides/v4`.</li><li>Added sample Next.js and Nuxt 3 sites.</li><li>Updated CDN-as-Code (EdgeJS) guides to expand on rule conditions and features.</li><li>Fixed search indexing to prevent unrelated results from appearing in search.</li></ul>  |

## May 2023

| Date  | Description                                                                                                                            |
|------------|----------------------------------------------------------------------------------------------------------------------------------------|
| 5/25/2023  | **Rules:** <ul><li>Added [Response Status Code (status_code) match condition](/guides/performance/rules/conditions#response-status-code).</li><li>Added [Optimize Images (optimize_images) feature](/guides/performance/rules/features#optimize-images).</li></ul> **{{ PORTAL }}:** <ul><li>Compare a version of an environment to any other version.</li><li>Added bulk import multiple environment variables.</li></ul>  |

## April 2023

| Date  | Description                                                                                                                            |
|-------|----------------------------------------------------------------------------------------------------------------------------------------|
| 4/27/2023  | **{{ PRODUCT_SECURITY }}:** <ul><li>Added reCAPTCHA support.</li></ul> **{{ PORTAL }}:** <ul><li>A team admin may now define a list of allowed IPs for {{ PORTAL }} access.</li></ul>  |
| 4/20/2023  | **Rules:** <ul><li>Added HTTP variables to autocomplete along with inline descriptions.</li><li>Added device classification HTTP variables.</li><li>Removed `equals` and `not equals` operators for the `Random Integer (random)` match condition.</li></ul> **{{ PRODUCT }} {{ PRODUCT_SECURITY }}:** <ul><li>Updated Managed Rules Latest ruleset.</li><li>Added Alert and Block tabs into Bot Manager Actions.</li><li>Added Spoof Bot default action type.</li></ul>  |
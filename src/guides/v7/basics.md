---
title: Basics
---

The {{ PRODUCT }} Applications platform consists of our {{ PRODUCT_EDGE }}, {{ PRODUCT_SECURITY }}, and {{ PRODUCT_PLATFORM }} products.

![{{ PRODUCT }} Applications platform](/images/v7/basics/applications.png)

Combine the above solutions to ensure the secure delivery of your website while drastically improving performance.

## Setup {/*setup*/}

Before you can take advantage of {{ PRODUCT_EDGE }}, {{ PRODUCT_SECURITY }}, and {{ PRODUCT_PLATFORM }}, you should set up the following basic {{ PRODUCT }} configuration:

-   [An {{ PRODUCT }} team space.](/guides/basics/collaboration) By default, your account will only have a private space that may only be accessed through your user account. Create a team space if you plan on collaborating with other teammates.
-   [An {{ PRODUCT }} property.](/guides/getting_started#create-property) A property instructs {{ PRODUCT }} how to process requests to your website.
-   [An environment.](/guides/basics/environments) An environment allows you to serve your site on different domains. For example, you can create environments for development, staging, and production to which you can deploy builds as they progress through your release workflow.
-   [A hostname](/guides/basics/hostnames_and_origins#hostnames) that identifies the domains through which traffic will be served. You must also authorize {{ PRODUCT }} to generate a TLS certificate for this hostname.
-   [An origin configuration](/guides/basics/hostnames_and_origins#origin) that identifies your web servers.
-   Once you are ready to [serve traffic through {{ PRODUCT }}](/guides/basics/hostnames_and_origins#serving-traffic-through), you should update your DNS configuration to point your website's domain to our service. 

![setup](/images/v7/basics/setup-overview.png)

Once you have set up a basic configuration, you are ready to take full advantage of {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }}:

-   [{{ PRODUCT_EDGE }}](/guides/performance). Learn how to:
    -   Optimize website performance through either [rules](/guides/performance/rules) or our [CDN-as-code approach](/guides/performance/cdn_as_code) to:
        -   [Cache](/guides/performance/getting_started#configure-caching) your content.
        -   Determine how your content is routed through our network.
        -   Define when web browsers should use [predictive prefetching](/guides/performance/prefetching) and the content that will be delivered before it is requested by your users.
    -   Gain performance insights through which you can fine-tune your configuration through our [Observability](/guides/performance/observability) solution.
    -   Speed up development and improve collaboration between your teams through:
	    -   Site previews for each deployment which allow your team to quickly review changes and identify issues. 
	    -   Our [Traffic Splitting](/guides/performance/traffic_splitting) solution which allow your team to quickly iterate through different variations of your site.
-   [{{ PRODUCT_SECURITY }}.](/guides/security) We automatically provide distributed denial-of-service (DDOS) protection to traffic that runs behind {{ PRODUCT }}. Apply additional protection to your web applications and APIs through:
    -   A [Web Application Firewall solution](/guides/security/waf) through which you can monitor, detect, and prevent application layer attacks.
	-   Basic [website security](/guides/security/edgejs_security), such as a Content Security Policy (CSP), a TLS certificate, Basic Authentication enforcement, environment variables for sensitive data (e.g., API keys), and protection against cache poisoning. 
	-   An [Origin shield](/guides/security/origin_shield) that reduces traffic to your origin servers through an additional caching layer.
-   [{{ PRODUCT_PLATFORM }}.](/guides/sites_frameworks/getting_started) If you are currently using a JavaScript framework, then you can improve your website's performance by using our serverless workers to quickly render server-side content in a scalable manner.

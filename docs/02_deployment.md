# SCAYLE Storefront Boilerplate - Deployment

_Last updated: 19. October 2023_

[[TOC]]

## Nuxt 3 Application Deployment Basics

A Nuxt application can be deployed on a Node.js server, pre-rendered for static hosting,
or deployed to serverless or edge (CDN) environments.

- [Nuxt 3 Official Documentation - Deployment](https://nuxt.com/docs/getting-started/deployment)

## Deployment Requirements

### Required environment variables during build time

- `NUXT_STORYBLOK_ACCESS_TOKEN`

### Infrastructure

#### Caching

The default deployment configuration of the Storefront Boilerplate expects a Redis or Redis-compatible
key/value storage (e.g. AWS ElastiCache) to be accessible.

As Nuxt and Storefront Core are relying on [unstorage](https://unstorage.unjs.io/) as abstraction layer,
all `unstorage` supported drivers can be configured to be used as caching interface.

#### Hosting Providers

Nuxt provides out-of-the-box presets for various [different hosting providers](https://nuxt.com/docs/getting-started/deployment#hosting-providers),
through its underlying [Nitro web server](https://nitro.unjs.io/deploy/providers/aws).

The SCAYLE Storefront Boilerplate has so far been tested with deployment to AWS (using Node.js server),
as well as [platform.sh](https://platform.sh/).

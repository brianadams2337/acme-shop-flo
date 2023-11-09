# SCAYLE Storefront Boilerplate Nuxt (Demo Shop)

The SCAYLE Storefront Boilerplate Nuxt is based on the [Nuxt 3 framework](https://nuxt.com/docs/getting-started/introduction).
Compared to the [Nuxt 2](https://v2.nuxt.com/) based DemoShop, there have been a multitude of changes due to the difference in overall framework architecture and more modern best practices,
while trying to keep the most possible similarities / compatibilities with the old Nuxt 2 based DemoShop.

Should you encounter any errors, please reach out to your Scayle representative or the Storefront Core team for quick support.

## Prerequisites

Before starting with the SCAYLE Storefront Boilerplate, we recommend to get familiar with Nuxt 3, Vue 3 and Tailwind, if this is not already the case:

- [Nuxt 3 Introduction](https://nuxt.com/docs/getting-started/introduction)
- [Vue 3 Introduction](https://vuejs.org/guide/introduction.html)
- [Tailwind Introduction](https://tailwindcss.com/docs/installation)

### Software

- `nvm`
- `node` >= 20.7.0
- `yarn` (v1)
- `redis`

#### Install supported Node.js Version

To install the supported `Node.js` version, we recommend the usage of the **Node Version Manager**, short `nvm`.

#### Using Redis locally

Depending on the circumstances the usage of redis `docker` image for the local setup might not be necessary or might result in degraded performance.
In this cases it is sufficient to have a locally installed version of `redis` / `redis-server` available.

## Starting the application

1. Create a local `.env` file in the main directory or rename the existing `.env.example` file.
   The relevant SCAYLE credentials should be provided to you by the projects SCAYLE project manager. If this is not yet the case, please reach out to the respective SCAYLE representative.
   For a in-depth explanation of the required environment variables, please consult the [SCAYLE Resource Center](https://scayle.dev/en/dev/storefront-core/introduction).
2. Install dependencies using `yarn install`
3. Create a local HTTPS certificate
   1. [How to turn on local HTTPS](#how-to-turn-on-local-https)
4. Start the `redis-server`
5. Start local dev server of SCAYLE Storefront Boilerplate / Nuxt 3 using `yarn dev`
6. Open the SCAYLE Storefront Boilerplate running under <http://localhost:3000/>

## How to turn on local HTTPS

To generate a certificate and key, run the following command in your project folder and follow the prompt to provide the certificate with dummy data in the terminal.
You can use `.` to fill out the certificate creation with blank data, as there is no need to input any actual data (e.g. `Country Name (2 letter code) []:.`).

```sh
openssl req -x509 -newkey rsa:4096 -keyout localhost.pem -out localhost.crt -sha256 -days 365
```

After generating the local key and certificate file, add both to your `.env`-file as follows

```yaml
HTTPS_KEY=localhost.pem
HTTPS_CERT=localhost.crt
```

Your project will now be served on <https://localhost:3000>.
Please keep in mind that the shop accessed through <http://localhost:3000> might not be reachable anymore.

### How to turn off local HTTPS

As the local HTTPS encryption is directly coupled to the `HTTPS_KEY` and `HTTPS_CERT`,
simply remove or comment out the entries in your `.env`-file, like this:

```ini
# HTTPS_KEY=localhost.key
# HTTPS_CERT=localhost.crt
SOME_OTHER_ACTIVE_KEY=someValue
```

Use <http://localhost:3000/> to open the shop

## Running a production-like preview

Run `yarn build` to build the latest changes and followed by `yarn preview`.
Keep in mind that a `redis-server` needs to be running.
This will run the generated nuxt application from the `.output/` directory, similar to how the application will be deployed on a production server.
Only difference here is that all relevant `NUXT_` runtimeConfig override values are sourced from the local `.env` file.

## Testing

For testing with Nuxt 3 we provide a [nuxt-vitest](https://github.com/danielroe/nuxt-vitest) integration. It allows us to use a Nuxt environment in [vitest](https://vitest.dev/).
For ease of use we use `.nuxt.test.ts` or `.nuxt.spec.ts` file suffix for our tests to use nuxt env.

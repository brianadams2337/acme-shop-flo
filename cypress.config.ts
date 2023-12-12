import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

dotenv.config()

const USER_AGENT =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'

const BASE_URL = process.env.BASE_URL ?? 'https://localhost:3000' // Try to use local .env BASE_URL or fallback

const DefaultViewport = {
  WIDTH: 1440,
  HEIGHT: 900,
}

export default defineConfig({
  pageLoadTimeout: 20000,
  defaultCommandTimeout: 20000,
  modifyObstructiveCode: false,
  video: false,
  videosFolder: './cypress/videos',
  screenshotsFolder: './cypress/screenshots',
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  projectId: 'fzuayb',
  viewportWidth: DefaultViewport.WIDTH,
  viewportHeight: DefaultViewport.HEIGHT,
  // Cypress - Environment Variables
  // https://docs.cypress.io/guides/guides/environment-variables
  env: {
    lang: 'de-DE',
    shop_selector: 'path',
  },
  e2e: {
    setupNodeEvents(_on, config) {
      return config.env.mobile
        ? {
            ...config,
            viewportWidth: 390,
            viewportHeight: 844,
            userAgent: USER_AGENT,
          }
        : {
            ...config,
            viewportWidth: DefaultViewport.WIDTH,
            viewportHeight: DefaultViewport.HEIGHT,
          }
    },
    // https://docs.cypress.io/guides/references/best-practices#Cypress-configuration-file
    baseUrl: BASE_URL, // Overridable in CI with CYPRESS_BASE_URL
    // https://docs.cypress.io/guides/references/experiments#End-to-End-Testing
    experimentalRunAllSpecs: true,
    // https://docs.cypress.io/guides/references/experiments#Experimental-Skip-Domain-Injection
    experimentalModifyObstructiveThirdPartyCode: true,
    includeShadowDom: true,
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})

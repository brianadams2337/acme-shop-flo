import { NuxtConfig } from '@nuxt/schema'
import environment from '../environment'

type ModuleOptions = NuxtConfig['i18n']

const DE_DOMAIN_FILE = 'de-DE.json'

const locales = [
  {
    code: 'en',
    iso: 'en-GB',
    domain: environment.DOMAIN_DEFAULT,
    file: 'en-GB.json',
  },
  {
    code: 'de',
    iso: 'de-DE',
    domain: environment.DOMAIN_DEFAULT,
    file: DE_DOMAIN_FILE,
    shopId: 1001,
  },
  {
    code: 'de-at',
    iso: 'de-AT',
    domain: environment.DOMAIN_DEFAULT,
    file: DE_DOMAIN_FILE,
  },
  {
    code: 'de-ch',
    iso: 'de-CH',
    domain: environment.DOMAIN_DEFAULT,
    file: DE_DOMAIN_FILE,
  },
]

const options: ModuleOptions = {
  locales,
  differentDomains: false,
  detectBrowserLanguage: false,
  defaultLocale: 'en',
  langDir: 'langs/',
  lazy: true,
  strategy: 'prefix',
  vueI18n: './i18n.config.ts',
}

export default options

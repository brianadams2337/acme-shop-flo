import { createConsola } from 'consola'
import { pascalCase } from 'change-case'
import { CMSProvidersMap } from './config'

export const moduleName = '@scayle/storefront-cms'
export const logger = createConsola({
  fancy: true,
  formatOptions: {
    colors: true,
  },
  level: process.env.ENABLE_NUXT_DEBUGGING ? 3 : -1,
  defaults: {
    tag: moduleName,
  },
})

export function isStringURL(string: string) {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

export function getComponentName(
  name: string | undefined,
  prefix: string = 'CMS',
) {
  if (!name) {
    return null
  }
  if (name.startsWith('Cms')) {
    name = name.replace('Cms', '')
  }
  return `${prefix}${pascalCase(name)}`
}

export const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
})

export const formattedProvidersKeys = formatter.format(
  Object.values(CMSProvidersMap),
)

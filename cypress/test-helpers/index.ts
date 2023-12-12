import { LOGGED_IN_USER_SESSION } from '../support/constants'

const deDE = require('../../langs/de-DE.json')
const enGB = require('../../langs/en-GB.json')

export const cleanText = (entry: string) => entry.trim().replace(/\n/, '')

export const getLocaleFile = () => {
  if (Cypress.env('lang') === 'en-EN') {
    return enGB
  } else {
    return deDE
  }
}

export const useLoggedInUser = () => {
  const session = {
    name: '$session',
    value: LOGGED_IN_USER_SESSION,
  }
  cy.setCookie(session.name, session.value)
  cy.wait(500)
}

export const shopSelectorBasedPath = (path: string) => {
  const isPathBasedShopSelectorEnabled = Cypress.env('shop_selector') === 'path'
  const isLocalePath = /^\/([a-z|A-Z]{2})\//.test(path)

  if (isPathBasedShopSelectorEnabled || isLocalePath) {
    return path
  }

  return path.startsWith('/') ? `/de${path}` : `/de/${path}`
}

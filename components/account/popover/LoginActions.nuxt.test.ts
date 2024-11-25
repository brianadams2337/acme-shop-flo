import { renderSuspended } from '@nuxt/test-utils/runtime'
import { expect, it } from 'vitest'
import LoginActions from './LoginActions.vue'

it('should render login and register button', async () => {
  const { getByRole } = await renderSuspended(LoginActions)
  const loginLink = getByRole('link', { name: 'Einloggen' })
  expect(loginLink).toBeInTheDocument()
  expect(loginLink).toHaveAttribute('href', '/de/signin')

  const registerLink = getByRole('link', { name: 'Registrieren' })
  expect(registerLink).toBeInTheDocument()
  expect(registerLink).toHaveAttribute('href', '/de/signin?register=true')
})

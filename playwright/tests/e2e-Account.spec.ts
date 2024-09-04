import { expect, test } from '../fixtures/fixtures'
import {
  HOMEPAGE_PATH_DE,
  LOGGED_IN_USER_DATA,
  SIGNIN_URL,
  USER_ACCOUNT,
} from '../support/constants'

test.beforeEach(async ({ signinPage, page, baseURL }) => {
  await expect(async () => {
    const url = baseURL + SIGNIN_URL
    await page.goto(url, { waitUntil: 'load' })
    await signinPage.fillLoginData(
      LOGGED_IN_USER_DATA.email,
      LOGGED_IN_USER_DATA.password,
    )
    await signinPage.clickLoginButton()
    await page.waitForURL(HOMEPAGE_PATH_DE)
    await page.goto(baseURL + USER_ACCOUNT.accountUserPath)
    await page.waitForURL(baseURL + USER_ACCOUNT.accountUserPath)
  }).toPass()
})

test('C2141211: Verify Account form elements', async ({ accountPage }) => {
  await expect(async () => {
    await expect(accountPage.genderButtonGroup).toBeVisible()
    await Promise.all([
      expect(accountPage.genderRadioButton('m')).toBeVisible(),
      expect(accountPage.genderRadioButton('f')).toBeVisible(),
      expect(accountPage.genderRadioButton('d')).toBeVisible(),
    ])
    await expect(accountPage.userFirstName).toBeVisible()
    await expect(accountPage.userLastName).toBeVisible()
    await expect(accountPage.userBirthDate).toBeVisible()
    await expect(accountPage.userEmailAddress).toBeVisible()
  }).toPass()
})

test('C2132122: Verify user data update', async ({
  accountPage,
  toastMessage,
}) => {
  await test.step('Update user data - correct format', async () => {
    await expect(async () => {
      await accountPage.updateUserData(
        USER_ACCOUNT.userFirstName,
        USER_ACCOUNT.userLastName,
        USER_ACCOUNT.userBirthDateCorrect,
        true,
      )
      await toastMessage.assertToastInfoIsVisible()
    }).toPass()
  })
  await test.step('Update user data - incorrect birth date', async () => {
    await expect(async () => {
      await accountPage.updateUserData(
        USER_ACCOUNT.userFirstName,
        USER_ACCOUNT.userLastName,
        USER_ACCOUNT.userBirthDateIncorrect,
        false,
      )
      await expect(accountPage.birthdateValidationLabel).toBeVisible()
    }).toPass()
  })
})

test('C2141212: Verify password change', async ({
  accountPage,
  toastMessage,
}) => {
  await test.step('Change password - correct format', async () => {
    await expect(async () => {
      await accountPage.updatePassword(
        LOGGED_IN_USER_DATA.password,
        LOGGED_IN_USER_DATA.password,
        LOGGED_IN_USER_DATA.password,
        true,
      )
      await toastMessage.assertToastInfoIsVisible()
    }).toPass()
  })
  await test.step('Change password - non-matching passwords', async () => {
    await expect(async () => {
      await accountPage.updatePassword(
        LOGGED_IN_USER_DATA.password,
        LOGGED_IN_USER_DATA.password,
        USER_ACCOUNT.nonMatchingPassword,
        false,
      )
      await expect(accountPage.passwordMismatchLabel).toBeVisible()
      await expect(accountPage.passwordUpdateButton).not.toBeEnabled()
    }).toPass()
  })
})

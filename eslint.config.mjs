// module.exports = {
//   root: true,
//   extends: [
//     'plugin:nuxt/recommended',
//     'plugin:tailwindcss/recommended',
//     // NOTE: ⇧ Place new eslint configs above this line ⇧
//     // ---
//     // We need to load the SCAYLE shared eslint configs after all
//     // 3rd party shared eslint configs to avoid import order incompatibilities
//     // within internally merged eslint config and prettier.
//     '@scayle/eslint-config-storefront/nuxt/nuxt',
//     '@scayle/eslint-config-storefront',
//   ],
//   // https://eslint.org/docs/latest/use/configure/ignore#ignorepatterns-in-config-files
//   ignorePatterns: ['cypress/', '**/fixtures/**/*'],
//   plugins: ['@scayle/vue-composable'],
//   rules: {
//     'tailwindcss/no-custom-classname': [
//       'warn',
//       {
//         whitelist: [
//           'picture',
//           'cms\\-picture',
//           'picture\\-contain',
//           'picture\\-cover',
//           'card',
//           'swipeout-action',
//         ],
//       },
//     ],
//     'tailwindcss/classnames-order': 'error',
//     'tailwindcss/no-unnecessary-arbitrary-value': 'error',
//     'vue/multi-word-component-names': 'warn',
//     '@scayle/vue-composable/no-composable-after-await': 'error',
//     '@scayle/vue-composable/no-lifecycle-after-await': 'error',
//     '@scayle/vue-composable/no-watch-after-await': 'error',
//   },
//   settings: {
//     /**
//      * Minimize the globbing scope to improve performance
//      * @see https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/276
//      * @see https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/174
//      */
//     tailwindcss: {
//       cssFiles: ['assets/css/**/*.css'],
//     },
//   },
// }

import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigStorefront from '@scayle/eslint-config-storefront'

// workaround for flat config not being supported yet by eslint-plugin-tailwindcss
// https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/280
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default withNuxt(
  eslintConfigStorefront(),
  ...compat.config({
    // https://github.com/francoismassart/eslint-plugin-tailwindcss
    extends: ['plugin:tailwindcss/recommended'],
    rules: {
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-unnecessary-arbitrary-value': 'error',
      'tailwindcss/no-custom-classname': [
        'warn',
        {
          whitelist: [
            'picture',
            'cms\\-picture',
            'picture\\-contain',
            'picture\\-cover',
            'card',
          ],
        },
      ],
    },
  }),
  ...compat.config({
    // @scayle/vue-composable
    plugins: ['@scayle/vue-composable'],
    rules: {
      '@scayle/vue-composable/no-composable-after-await': 'error',
      '@scayle/vue-composable/no-lifecycle-after-await': 'error',
      '@scayle/vue-composable/no-watch-after-await': 'error',
    }
  }),
)

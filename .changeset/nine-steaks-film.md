---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[Architecture\]** Improved the Storefront application's internationalization (i18n) implementation by switching to direct usage of the `useI18n` composable within the `setup` script blocsk.
This approach offers several advantages over accessing i18n through `useNuxtApp`:

- **Simplicity**: Directly using `useI18n` is simpler and more intuitive, reducing the complexity of code.
- **Performance**: Accessing `useI18n` directly can be more performant as it avoids the additional overhead of going through `useNuxtApp`.
- **Type Safety**: Direct usage often provides better TypeScript support, ensuring type safety and better developer experience.
- **Readability**: It makes the code more readable and maintainable by clearly indicating the use of i18n functionalities.

However, it's important to note that this change introduces a constraint: `useI18n` must now be called directly within the `setup` script.
Attempting to use it within other composables that are not called within setup will result in an error.
This trade-off is considered acceptable given the overall benefits of this optimization.

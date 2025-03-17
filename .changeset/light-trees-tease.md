---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[Architecture\]** Enforced consistent `defineEmits` [`type-literal`](https://eslint.vuejs.org/rules/define-emits-declaration.html#type-literal) syntax using the [`vue/define-emits-declaration`](https://eslint.vuejs.org/rules/define-emits-declaration.html#vue-define-emits-declaration) ESLint rule.

- Before:
  ```vue
  <script setup lang="ts">
  const props = defineProps(['foo', 'bar'])
  // or
  const emit = defineEmits<{
    (e: 'foo', id: number): void
    (e: 'bar', value: string): void
  }>()
  </script>
  ```
- After:
  ```vue
  <script setup lang="ts">
  const emit = defineEmits<{
    foo: [id: number]
    bar: [value: string]
  }>()
  </script>
  ```

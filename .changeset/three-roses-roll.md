---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[Architecture\]** Simplified component prop declarations by leveraging [Vue's reactive destructuring](https://vuejs.org/guide/components/props.html#reactive-props-destructure).
This allows for more concise and readable prop definitions, reducing boilerplate code.

- Example:

  ```vue
  <script setup lang="ts">
  // Using reactive props destructure
  const { name = '' } = defineProps<{ name?: string }>()

  // Alternatively, defining props with `withDefaults` without destructuring
  const props = withDefaults(defineProps<{ name?: string }>(), { name: '' })
  </script>
  ```

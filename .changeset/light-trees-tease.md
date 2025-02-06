---
'@scayle/storefront-boilerplate-nuxt': minor
---

[Architecture] Added the eslint rule [`vue/define-emits-declaration`](https://eslint.vuejs.org/rules/define-emits-declaration.html#vue-define-emits-declaration) to enforce the [`type-literal`](https://eslint.vuejs.org/rules/define-emits-declaration.html#type-literal) syntax when declaring event emitters.

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

will become

```vue
<script setup lang="ts">
const emit = defineEmits<{
  foo: [id: number]
  bar: [value: string]
}>()
</script>
```

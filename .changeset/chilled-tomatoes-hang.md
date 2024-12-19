---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[Consistency\]** Refactor `<Listbox />` to manage the `isOpen` state without the use of `useState`. Instead of passing a name to `<ListboxButton />` and `<ListboxOption />`, they now require a function to toggle the open state.

Example:

```html
// Before
<SFListbox>
  <template #default="{ isOpen, list }">
    <SFListboxButton :id="id" ref="button" :list-name="list">
      ...
    </SFListboxButton>
  </template>
  <template #options="{ isOpen, list, close }">
    <SFListboxOptions>
      <SFListboxOption :list-name="list"> ... </SFListboxOption>
    </SFListboxOptions>
  </template>
</SFListbox>
// After
<SFListbox>
  <template #default="{ isOpen, toggleListboxOpen }">
    <SFListboxButton
      :id="id"
      ref="button"
      :toggleListboxOpen="toggleListboxOpen"
    >
      ...
    </SFListboxButton>
  </template>
  <template #options="{ isOpen, toggleListboxOpen, close }">
    <SFListboxOptions>
      <SFListboxOption :toggleListboxOpen="toggleListboxOpen">
        ...
      </SFListboxOption>
    </SFListboxOptions>
  </template>
</SFListbox>
```

Affected files:

- `components/layout/headers/ShopSwitcher.vue`

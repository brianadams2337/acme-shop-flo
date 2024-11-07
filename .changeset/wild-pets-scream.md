---
'@scayle/storefront-boilerplate-nuxt': patch
---

`useDropdownKeyboardBehavior` did register some key down events handlers globally. These event listener are now limited to elements of a dropdown.

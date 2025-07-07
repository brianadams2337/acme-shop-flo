---
'@scayle/storefront-application-nuxt': patch
---

**\[Accessibility\]** Resolved an issue where `mouseleave` event on `SFHeaderNavigationItem` triggered a focus on an old element on the PLP after revisiting the page.

The `deactivate` function of `useFocusTrap` is now called with the `returnFocus` option set to `false` when the flyout was opened on mouse hover.
This will prevent the a focus event on an element after closing the flyout on `mouseleave`, ensuring a smoother and more expected user experience.

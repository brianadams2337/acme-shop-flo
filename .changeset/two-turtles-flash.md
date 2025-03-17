---
'@scayle/storefront-boilerplate-nuxt': minor
---

- **\[Login & Registration\]** Users will experience a smoother and more accessible login process.
  The login/registration flow has been redesigned with a focus on simplicity and accessibility.
  Changes include:
  - **UI/UX:** Simplified layout, updated styling for text input fields and gender selection, and enhanced accessibility features (improved semantics and keyboard navigation).
  - **Functionality:** Standardized handling of `redirectUrl` to ensure users are redirected to their intended destination after login. Improved form validation and more informative error messages displayed in a dedicated error container. Successful logins are now confirmed with a toast notification.
  - **Performance:** Implemented SSR for the signin page, resulting in faster initial load times. Removed client-side handling of the last logged in user information, eliminating the need for local storage management and further improving performance.

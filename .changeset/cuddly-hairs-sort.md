---
'@scayle/storefront-boilerplate-nuxt': minor
---

[Forgot & Reset Password] Introducing an enhanced forgot password flow interface. On the login page,
users will discover a `forgot password` button that triggers a smooth slide-in flyout form.
This form includes a validated email field, ensuring accuracy before submission.
Upon submission, a reset link will be promptly dispatched to the provided email address.
After the user clicks on the link provided in the email, they will be redirected to our `signin` page with
the provided `hash`, which will initiate the `reset password` slide-in form upon page landing.
The user will be presented with the password input field, and upon submission, if everything
is valid, the password will be successfully updated.

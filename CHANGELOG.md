# @scayle/storefront-boilerplate-nuxt

## 1.0.0-rc.03

### Major Changes

- Introduced `vitest` for unit testing and created dummy test files for most components
- Introduced page caching using [Route Rules](https://nuxt.com/docs/guide/concepts/rendering#route-rules)
- Replacing AuthGuard component with router middleware
- Use `defineOptions` for `vue` component naming


### Minor Changes

- Introduce `localizedNavigateTo` for the programmatic routing approach
- Upgrade to Vue 3.3.7
- Replaced `useUiState` with smaller composables which are: `useFlyouts`, `useMobileSearch`, `useModal` & `useSideNavigation`.
- Enable auto-import for the `constants` folder
- Various dependency minor dependency

### Patch Changes

- Fixed session max age
- Handle AddToWishlist errors
- Added missing Storyblok components
- Resolved Storyblok link
- Fixed broken links when path-based shops are enabled
- Various bugfixes

## 1.0.0-rc.02

### Minor Changes

- Upgrade to Nuxt 3.7.4


### Patch Changes

- Reduction of hydration errors
- Improved error handling for invalid products on PDP, as well as category and service pages
- Improved handling of displaying account related UI elements for guest user
- Improved order refresh behaviour on Order Success Page
- Various smaller bug fixes

## 1.0.0-rc.01

### Major Changes

- Introduce Nuxt 3
- Tracking of all relevant shop interactions with GTM
- Implemented Search Engine optimizations
- Provide more CMS content integrations (Storyblok) into all relevant pages

### Minor Changes

- Improved error handling and displaying of error pages
- Improvements to redirect handling
- Improved SVG icon handling
- Improvements to mobile styling and behaviour

### Patch Changes

- Various bugfixes

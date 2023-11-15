# 1. Lazy flag removal

Date: 2023-11-15

## Status

Pending

## Context

Main reason why we introduced this change is to allow Nuxt to block navigation
until every `async` operation is resolved within the `async setup`. This way we
make sure that we have all the data prepared for the new page that should also
result in ditching away the loading states (e.g skeleton loaders)

## Decision

The decision is to remove `lazy` flag within the `useRpc` options so that we do not
let `async` operations to hang. This way, we make sure that every `async` operation
will be resolved before the navigation.

```ts
// Before:
const { data } = useProduct({ options: { lazy: true } })

// After:
const { data } = useProduct() // Lazy is `false` by default
```

## Consequences

### Pros:

- Navigation target page should have all the data prepared and the content will be prerendered
- No more skeleton loaders
- Now we can ensure that we have existing data in the certain composables since
  we can call them after the desired `async operation` with the required data is resolved
- Potential Lighthouse score improvement

### Cons:

- We need to take care of the initial load that is fast enough
  (all `async` operations resolvement duration), otherwise the navigation
  delay can be too long which will be bad user experience

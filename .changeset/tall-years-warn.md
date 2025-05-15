---
'@scayle/storefront-application-nuxt': minor
---

**\[OTEL\]** Added support for enriching OpenTelemetry data with Git repository information. The following build arguments can now be passed when building the Docker image to include the Git commit SHA and repository URL:

```sh
docker build ./docker/node \
--build-arg GIT_REPOSITORY_URL=$(git config --get remote.origin.url) \
--build-arg GIT_COMMIT_SHA=$(git rev-parse HEAD)
```

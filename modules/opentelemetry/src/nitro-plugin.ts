import { getRequestURL } from 'h3'
import { trace, type Span, SpanStatusCode } from '@opentelemetry/api'
import {
  SEMATTRS_HTTP_HOST,
  SEMATTRS_HTTP_METHOD,
  SEMATTRS_HTTP_ROUTE,
} from '@opentelemetry/semantic-conventions'

const tracer = trace.getTracer(
  'nitro',
  // TODO: Add nitro version
)

export default defineNitroPlugin((nitro) => {
  // Find the h3 handler which is the nitro router
  const index = nitro.h3App.stack.findIndex(
    (layer) => layer.handler.__resolve__,
  )
  const router = nitro.h3App.stack[index]

  if (!router) {
    console.warn('Unable to find router handler')
    return
  }

  // Wrap the nitro router with code which adds a span
  nitro.h3App.stack.splice(index, 1, {
    route: '/',
    handler: async (event) => {
      const url = getRequestURL(event)

      return await tracer.startActiveSpan(
        `${event.method} ${event.path}`,
        {
          attributes: {
            [SEMATTRS_HTTP_HOST]: url.host,
            [SEMATTRS_HTTP_METHOD]: event.method,
            'url.full': url.toString(),
            'url.path': url.pathname,
            'url.query': url.search,
            'url.scheme': url.protocol,
          },
        },
        async (span: Span) => {
          let result
          try {
            result = await router?.handler(event)
          } catch (e) {
            if (e instanceof Error) {
              span.recordException(e)
            }
            span.setStatus({ code: SpanStatusCode.ERROR })
          }

          // The matchedRoute exists after the handler has run
          const matchedRoute = event.context.matchedRoute?.path

          // For page requests, the matched route path is '/**'
          // That is not helpful so we ignore it
          // TODO: Figure out how to get a better match in this case
          // Is there an internal Nuxt router that Nitro delegates to here?
          if (matchedRoute && matchedRoute !== '/**') {
            span.updateName(matchedRoute)
            span.setAttribute(SEMATTRS_HTTP_ROUTE, matchedRoute)
          }

          span.end()

          return result
        },
      )
    },
  })
})

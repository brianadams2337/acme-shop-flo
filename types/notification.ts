import type { RouteLocationRaw } from '#vue-router'

export {}

declare global {
  type AppNotificationAction = 'CONFIRM' | 'RELOAD' | 'ROUTE'

  type AppNotificationOptions = Partial<{
    duration: number
    to: RouteLocationRaw
  }>

  type NotificationOnClickActions = { close: () => void }

  interface NotificationActionHandler {
    text: string
    class?: string
    href?: RouteLocationRaw
    onClick?: (_: Event, actions: NotificationOnClickActions) => void
  }

  interface AppNotification {
    id: string
    message: string
    duration: number
    actions: NotificationActionHandler[]
  }
}

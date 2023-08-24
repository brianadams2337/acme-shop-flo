import { RouteLocationRaw } from '#vue-router'

type Link = 'home'

export type LinkList = Record<Link, RouteLocationRaw>

export const routes: LinkList = {
  home: { name: 'index', path: '/' },
}

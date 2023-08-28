type Link = 'home'

export type LinkList = Record<Link, { name: string; path: string }>

const routes: LinkList = {
  home: { name: 'index', path: '/' },
} as const

export default { routes }

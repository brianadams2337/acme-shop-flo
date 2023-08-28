type Link = 'home' | 'checkout'

export type LinkList = Record<Link, { name: string; path: string }>

const routes: LinkList = {
  home: { name: 'index', path: '/' },
  checkout: { name: 'checkout', path: '/checkout' },
} as const

export default { routes }

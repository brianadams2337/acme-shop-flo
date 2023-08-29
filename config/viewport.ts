import { ModuleOptions } from 'nuxt-viewport'
import breakpoints from './breakpoints'

const options: Partial<ModuleOptions> = {
  breakpoints,
  defaultBreakpoints: {
    desktop: 'lg',
    mobile: 'xs',
    tablet: 'md',
  },
}

export default options

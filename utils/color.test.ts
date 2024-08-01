import type { Value } from '@scayle/storefront-nuxt'
import { it, describe } from 'vitest'
import { hexToRGBAColor, formatColors } from './color'

describe('hexToRGBAColor', () => {
  it('returns RGBA color with alpha value', ({ expect }) => {
    const color = hexToRGBAColor('#ffffff', 0.5)
    expect(color).toEqual('rgba(255,255,255,0.005)')
  })
})

describe('formatColors', () => {
  it('returns formatted colors', ({ expect }) => {
    const colorAttributes: Value[] = [
      {
        id: 1,
        label: 'Weiß',
        value: 'weiss',
      },
      {
        id: 2,
        label: 'Rot',
        value: 'rot',
      },
      {
        id: 3,
        label: 'Blau',
        value: 'blau',
      },
    ]
    const colors = formatColors(colorAttributes)
    expect(colors).toEqual('Weiß, Rot & Blau')
  })

  it('returns single formatted color if one color is provided', ({
    expect,
  }) => {
    const colorAttributes: Value[] = [
      {
        id: 1,
        label: 'Weiß',
        value: 'weiss',
      },
    ]

    const colors = formatColors(colorAttributes)
    expect(colors).toEqual('Weiß')
  })

  it('returns an empty string when colors are not provided', ({ expect }) => {
    const colors = formatColors()
    expect(colors).toEqual('')
  })
})

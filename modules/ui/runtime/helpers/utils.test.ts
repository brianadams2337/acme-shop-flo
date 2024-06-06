import { describe, expect, it } from 'vitest'
import { showDividerTag } from './utils'

describe('showDividerTag', () => {
  it('should return "true" for first item in the array', () => {
    const isDividerTagShown = showDividerTag(0, 4)

    expect(isDividerTagShown).toEqual(true)
  })

  it('should return "false" for last item in the array', () => {
    const isDividerTagShown = showDividerTag(4, 4)

    expect(isDividerTagShown).toEqual(false)
  })
})

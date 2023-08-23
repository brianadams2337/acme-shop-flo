import { Size } from '~/constants/ui'

const useUiSize = (currentSize: Size = Size.MD) => {
  const isSize = (size?: Size): boolean => size === currentSize

  return {
    isSize,
  }
}

export default useUiSize

export default () => {
  const viewPort = useViewport()
  return {
    md: computed(() => viewPort.isGreaterOrEquals('md')),
    sm: computed(() => viewPort.isLessThan('md')),
    xs: computed(() => viewPort.isLessThan('sm')),
  }
}

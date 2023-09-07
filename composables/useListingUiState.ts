// TODO check why this is outside the composable
const listingUiState = reactive({
  columns: 0,
})

export default () => {
  const { isGreaterOrEquals } = useViewport()
  const md = computed(() => isGreaterOrEquals('md'))
  if (listingUiState.columns === 0) {
    listingUiState.columns = !md.value ? 2 : 3
  }
  const listingColumns = computed(() => listingUiState.columns)

  const setColumns = (columns: number) => {
    listingUiState.columns = columns
  }

  const isColumn = (number: number): boolean => {
    return number === listingColumns.value
  }

  return {
    listingColumns,
    setColumns,
    isColumn,
  }
}

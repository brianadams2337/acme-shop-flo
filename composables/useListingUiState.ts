export default () => {
  const { isGreaterOrEquals } = useViewport()

  const listingUiState = reactive({
    columns: 0,
  })

  if (listingUiState.columns === 0) {
    listingUiState.columns = !isGreaterOrEquals('md') ? 2 : 3
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

export async function useHeaderNavigationTrees() {
  const { data } = await useNavigationTrees()

  const headerNavigationTrees = computed(() => {
    return filterNavigationTree(data.value, 'header')
  })

  return { headerNavigationTrees }
}

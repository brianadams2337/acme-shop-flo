export async function useHeaderNavigationTrees() {
  const { data } = await useNavigationTrees()

  const currentShop = useCurrentShop()

  const headerNavigationTrees = computed(() => {
    return filterNavigationTree(
      data.value,
      currentShop.value.navigationTreeHeader || 'header',
    )
  })

  return { headerNavigationTrees }
}

export async function useFooterNavigationTrees() {
  const { data } = await useNavigationTrees()

  const currentShop = useCurrentShop()

  const footerNavigationTrees = computed(() => {
    return filterNavigationTree(
      data.value,
      currentShop.value.navigationTreeFooter || 'footer',
    )
  })

  return { footerNavigationTrees }
}

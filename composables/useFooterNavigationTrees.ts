export async function useFooterNavigationTrees() {
  const { data } = await useNavigationTrees()

  const footerNavigationTrees = computed(() => {
    return filterNavigationTree(data.value, 'footer')
  })

  return { footerNavigationTrees }
}

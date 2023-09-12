<script setup lang="ts">
const { isLoggedIn } = await useUser()
const router = useRouter()

watch(
  () => isLoggedIn.value,
  (value) => {
    !value && router.push(toLocalePath(routeList.signin.path))
  },
  { immediate: true },
)
</script>

<template>
  <SFPopover
    :is-open="isUserFlyoutOpen"
    content-wrapper-class="mt-8"
    :disable-popover-content="isMobile"
    @mouseenter="openUserFlyout()"
    @mouseleave="closeUserFlyout()"
    @focusin="openUserFlyout()"
    @focusout="closeUserFlyout()"
  >
    <template #action>
      <LocalizedLink :to="link" raw>
        <IconAccount class="size-6" />
      </LocalizedLink>
      <div
        v-if="isUserFlyoutOpen"
        class="absolute -bottom-3 h-0.5 w-8 bg-black"
      />
    </template>
    <template v-if="mounted" #content>
      <AsyncDataWrapper :status="status">
        <UserActions v-if="user" />
        <GuestActions v-else />
      </AsyncDataWrapper>
    </template>
  </SFPopover>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMounted } from '@vueuse/core'
import UserActions from './UserActions.vue'
import GuestActions from './GuestActions.vue'
import { routeList } from '~/utils/route'
import { useUser } from '#storefront/composables'
import { useDefaultBreakpoints, useFlyouts } from '~/composables'
import { SFPopover } from '#storefront-ui/components'
import AsyncDataWrapper from '~/components/AsyncDataWrapper.vue'
import LocalizedLink from '~/components/LocalizedLink.vue'

const { smaller } = useDefaultBreakpoints()

const isMobile = smaller('md')

const { openUserFlyout, closeUserFlyout, isUserFlyoutOpen } = useFlyouts()
const { user, status } = useUser()

const mounted = useMounted()
const link = computed(() => (user.value ? routeList.account : routeList.signin))
</script>

<template>
  <I18nT
    keypath="sign_in_page.sign_up.privacy_disclaimer"
    tag="p"
    scope="global"
    class="text-sm leading-5 text-gray-600"
  >
    <template #terms>
      <SFLocalizedLink
        :to="PRIVACY_POLICY_LINK"
        target="_blank"
        raw
        class="rounded-base font-semibold hover:bg-gray-100 hover:outline hover:outline-2 hover:outline-gray-100"
      >
        {{ $t('sign_in_page.sign_up.terms') }}
      </SFLocalizedLink>
    </template>
    <template #policy>
      <SFLocalizedLink
        :to="PRIVACY_POLICY_LINK"
        target="_blank"
        raw
        class="mr-0.5 rounded-base font-semibold hover:bg-gray-100 hover:outline hover:outline-2 hover:outline-gray-100"
      >
        {{ $t('sign_in_page.sign_up.policy') }}
      </SFLocalizedLink>
    </template>
  </I18nT>
</template>

<script setup lang="ts">
import { I18nT } from 'vue-i18n'
import SFLocalizedLink from '~/components/SFLocalizedLink.vue'

const PRIVACY_POLICY_LINK = '/s/data-privacy'
</script>

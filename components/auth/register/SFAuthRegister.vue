<template>
  <form v-if="v" class="flex flex-col" @submit.prevent="onSubmit">
    <SFAuthErrorMessageContainer
      data-testid="register-error-message-container"
      :message="errorMessage"
      class="mb-8"
    />
    <SFValidatedInputGroup v-slot="{ isValid }" :errors="v.gender.$errors">
      <SFGenderSelection
        v-model="userPayload.gender"
        :disabled="isSubmitting"
        :is-valid="isValid"
      />
    </SFValidatedInputGroup>
    <SFValidatedInputGroup v-slot="{ isValid }" :errors="v.first_name.$errors">
      <SFTextInput
        v-model="userPayload.first_name"
        autocomplete="given-name"
        :placeholder="$t('form_fields.first_name')"
        :has-errors="!isValid"
        required
        :readonly="isSubmitting"
        @change="v.first_name.$touch()"
      />
    </SFValidatedInputGroup>
    <SFValidatedInputGroup v-slot="{ isValid }" :errors="v.last_name.$errors">
      <SFTextInput
        v-model="userPayload.last_name"
        autocomplete="family-name"
        :placeholder="$t('form_fields.last_name')"
        :has-errors="!isValid"
        required
        :readonly="isSubmitting"
        @change="v.last_name.$touch()"
      />
    </SFValidatedInputGroup>
    <SFValidatedInputGroup v-slot="{ isValid }" :errors="v.email.$errors">
      <SFTextInput
        v-model="userPayload.email"
        autocomplete="email"
        :placeholder="$t('form_fields.email')"
        type="email"
        :has-errors="!isValid"
        required
        :readonly="isSubmitting"
        @change="v.email.$touch()"
      />
    </SFValidatedInputGroup>
    <SFValidatedInputGroup
      v-slot="{ isValid }"
      :errors="v.password.$errors"
      class="h-26"
    >
      <SFPasswordInput
        v-model="userPayload.password"
        :is-valid="isValid"
        :placeholder="$t('form_fields.password')"
        autocomplete="new-password"
        data-testid="new-password"
        @change="v.password.$touch()"
      />
    </SFValidatedInputGroup>
    <div class="flex items-center justify-between">
      <SFButton
        :disabled="isSubmitting"
        :loading="isSubmitting"
        type="submit"
        data-testid="register-submit"
        class="w-1/2"
      >
        {{ $t('sign_in_page.sign_up.submit') }}
      </SFButton>
      <span class="text-xs text-gray-500">
        {{ $t('sign_in_page.sign_up.mandatory_info') }}
      </span>
    </div>
  </form>
  <SFAuthRegisterPrivacyDisclaimer class="mt-5" />
  <SFAuthSeparator class="my-8 lg:my-10" />
  <p class="text-start text-base text-gray-600">
    {{ $t('sign_in_page.sign_up.not_new_user') }}
    <SFLocalizedLink
      :to="routeList.signin"
      raw
      class="rounded-md p-1 py-0.5 font-semibold hover:bg-gray-100"
    >
      {{ $t('sign_in_page.sign_up.go_to_login') }} </SFLocalizedLink
    >.
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import type { Gender } from '@scayle/storefront-nuxt'
import type { Required } from 'utility-types'
import SFPasswordInput from '../SFPasswordInput.vue'
import SFGenderSelection from '../SFGenderSelection.vue'
import SFAuthErrorMessageContainer from '../SFAuthErrorMessageContainer.vue'
import SFAuthRegisterPrivacyDisclaimer from './SFAuthRegisterPrivacyDisclaimer.vue'
import SFLocalizedLink from '~/components/SFLocalizedLink.vue'
import { useValidationRules, useAuthentication } from '~/composables'
import { routeList } from '~/utils'
import {
  SFButton,
  SFTextInput,
  SFValidatedInputGroup,
} from '#storefront-ui/components'
import SFAuthSeparator from '~/components/auth/SFAuthSeparator.vue'
import { PASSWORD_MIN_LENGTH } from '~/constants/password'

const { register, isSubmitting, errorMessage } = useAuthentication('sign_up')
const validationRules = useValidationRules()

type UserPayload = {
  gender?: Gender
  first_name: string
  last_name: string
  email: string
  password: string
}

const userPayload = ref<UserPayload>({
  gender: undefined,
  first_name: '',
  last_name: '',
  email: '',
  password: '',
})

const onSubmit = async () => {
  const isValid = await v.value.$validate()
  if (isValid) {
    await register(userPayload.value as Required<UserPayload>)
  }
}

const v = useVuelidate(
  {
    gender: {
      required: validationRules.required,
    },
    first_name: {
      required: validationRules.required,
      name: validationRules.name,
    },
    last_name: {
      required: validationRules.required,
      name: validationRules.name,
    },
    email: {
      required: validationRules.required,
      email: validationRules.email,
    },
    password: {
      required: validationRules.required,
      password: validationRules.password,
      minLength: validationRules.minLength(PASSWORD_MIN_LENGTH),
    },
  },
  userPayload.value as Required<UserPayload>,
)
</script>

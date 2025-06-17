<script setup lang="ts">
import { useField, useForm } from 'vee-validate'

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value: string) {
      if (value?.length >= 2) return true
      return 'Name needs to be at least 2 characters.'
    },
    phone(value: string) {
      if (/^[0-9-]{7,}$/.test(value)) return true
      return 'Phone number needs to be at least 7 digits.'
    },
    email(value: string) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
      return 'Must be a valid e-mail.'
    },
    checkbox(value: string) {
      if (value === '1') return true
      return 'Must be checked.'
    },
    password(value: string) {
      if (/^[0-9-]{8,}$/.test(value)) return true
      return 'Password needs to be at least 8 characters.'
    },
    confirmPassword(value: string) {
      if (/^[0-9-]{8,}$/.test(value)) return true
      return 'Password needs to be at least 8 characters.'
    },
  },
})
const name = useField('name')
const phone = useField('phone')
const email = useField('email')
const password = useField('password')
const confirmPassword = useField('confirmPassword')
const checkbox = useField('checkbox')

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <h2>Register</h2>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="name.value.value"
      :counter="10"
      :error-messages="name.errorMessage.value"
      label="Name"
    ></v-text-field>

    <v-text-field
      v-model="phone.value.value"
      :counter="7"
      :error-messages="phone.errorMessage.value"
      label="Phone Number"
    ></v-text-field>

    <v-text-field
      v-model="email.value.value"
      :error-messages="email.errorMessage.value"
      label="E-mail"
    ></v-text-field>

    <v-text-field
      v-model="password.value.value"
      :counter="8"
      :error-messages="password.errorMessage.value"
      label="Password"
      type="password"
    ></v-text-field>

    <v-text-field
      v-model="confirmPassword.value.value"
      :counter="8"
      :error-messages="confirmPassword.errorMessage.value"
      label="Confirm Password"
      type="password"
    ></v-text-field>

    <v-checkbox
      v-model="checkbox.value.value"
      :error-messages="checkbox.errorMessage.value"
      label="I agree to the terms and conditions"
      value="1"
    ></v-checkbox>

    <v-btn class="me-4" type="submit"> Register </v-btn>

    <v-btn @click="handleReset"> Clear </v-btn>
  </form>
</template>

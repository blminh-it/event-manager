<script setup lang="ts">
import { useField, useForm } from 'vee-validate'

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    password(value: string) {
      if (/^[0-9-]{8,}$/.test(value)) return true
      return 'Password needs to be at least 8 characters.'
    },
    email(value: string) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
      return 'Must be a valid e-mail.'
    },
    checkbox(value: string) {
      if (value === '1') return true
      return 'Must be checked.'
    },
  },
})
const password = useField('password')
const email = useField('email')
const checkbox = useField('checkbox')

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <h2>Login</h2>
  <form @submit.prevent="submit">
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

    <v-checkbox
      v-model="checkbox.value.value"
      :error-messages="checkbox.errorMessage.value"
      label="Remember me"
      value="1"
    ></v-checkbox>

    <v-btn class="me-4" type="submit" color="indigo-darken-3"> Login </v-btn>

    <v-btn @click="handleReset" color="grey-lighten-3"> Clear </v-btn>
  </form>
</template>

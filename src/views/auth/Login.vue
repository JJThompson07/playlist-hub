<template>
  <form @submit.prevent="handleSubmit">
    <h3>Log in</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">

    <div class="error" v-if="error">{{ error }}</div>

    <button v-if="!isPending">Log in</button>
    <button v-else disabled>Loading</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '@/composables/useLogin'

export default {
  name: "Login",
  setup(props, context) {
    const email = ref('')
    const password = ref('')

    const { login, error, isPending } = useLogin()

    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if (!error.value) {
        // context.emit('login')
        console.log('User logged in')
      }
    }

    return {
      email,
      password,
      error,
      handleSubmit,
      isPending
    }
  }
}
</script>

<style scoped>

</style>

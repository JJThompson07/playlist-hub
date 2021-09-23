<template>
  <form @submit.prevent="handleSubmit">
    <h3>Log in</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">

    <div class="error" v-if="error">{{ error }}</div>

    <button v-if="!isPending">Log in</button>
    <button v-else disabled>Loading</button>
    <div class="form__link">Not a member? <span class="link" @click="handleClick">Signup</span> here.</div>
  </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '@/composables/useLogin'
import { useRouter } from 'vue-router'

export default {
  name: "Login",
  setup(props, context) {
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const { login, error, isPending } = useLogin()

    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if (!error.value) {
        router.push({ name: 'UserPlaylists' })
        console.log('User logged in')
      }
    }

    const handleClick = () => {
      router.push({ name: 'Signup' })
    }

    return {
      email,
      password,
      error,
      handleSubmit,
      handleClick,
      isPending
    }
  }
}
</script>

<style scoped>

</style>

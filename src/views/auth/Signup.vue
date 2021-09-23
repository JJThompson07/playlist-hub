<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display Name" v-model="displayName">
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">

    <div class="error" v-if="error">{{ error }}</div>

    <button v-if="!isPending">Sign up</button>
    <button v-else disabled>Loading</button>
    <div class="form__link">Already a member? <span class="link" @click="handleClick">Login</span> here.</div>

  </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../../composables/useSignup'
import { useRouter } from 'vue-router'

export default {
  name: "Signup",
  setup(props, context) {
    const email = ref('')
    const password = ref('')
    const displayName = ref('')
    const router = useRouter()

    const { signup, error, isPending } = useSignup()

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value)
      if (!error.value) {
        router.push({ name: 'UserPlaylists' })
        console.log('User Signed up')
      }
    }

    const handleClick = () => {
      router.push({ name: 'Login' })
    }

    return {
      email,
      password,
      displayName,
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

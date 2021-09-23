<template>
  <div class="navbar">
    <nav class="nav">
      <div class="nav__left">
        <img class="logo" src="@/assets/josh-bear.png">
        <h1>
          <router-link :to="{ name: 'Home' }">Playlist Hub</router-link>
        </h1>
      </div>
      <div class="links">
        <span v-if="auth">Hi there, {{ auth.displayName }}</span>
        <router-link v-if="auth" class="btn" :to="{ name: 'UserPlaylists' }">My Playlists</router-link>
        <router-link v-if="auth" class="btn" :to="{ name: 'CreatePlaylist' }">Create Playlist</router-link>
        <button v-if="!isPending && auth" class="btn" @click="logOut">Logout</button>
        <button v-if="isPending && auth" class="btn" disabled>logging out</button>
        <router-link v-if="!auth" class="btn" :to="{ name: 'Signup' }">Signup</router-link>
        <router-link v-if="!auth" class="btn" :to="{ name: 'Login' }">Login</router-link>
      </div>
    </nav>
    <div v-if="error">{{ error }}</div>

  </div>
</template>

<script>
import useLogout from '../composables/useLogout'
import { useRouter } from 'vue-router'
import getUser from '../composables/getUser'
export default {
  name: "Navbar",
  setup() {
    const { logout, error, isPending } = useLogout()
    const router = useRouter()
    const { user: auth } = getUser()

    const logOut = async () => {
      await logout()
      if (!error.value) {
        console.log('user logged out')
        router.push({ name: 'Login' })
      }
    }

    console.log(auth)

    return {
      logOut,
      isPending,
      error,
      auth
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0.5rem 1rem;
  background: white;

  h1 {
    margin: 0 1rem;
  }
}
.logo {
  max-height: 60px;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__left {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
}
.links {
  display: flex;
  flex-flow: row;
  gap: 0.5rem;
  align-items: center;

  span {
    padding: 0 1rem;
    border-right: dashed 1px var(--secondary);
  }
}

</style>

<template>
  <div class="navbar">
    <nav class="nav">
      <h1>
        <router-link :to="{ name: 'Home' }">Playlist Hub</router-link>
      </h1>
      <div class="links">
        <button @click="logOut">logout</button>
        <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
        <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
      </div>
    </nav>

  </div>
</template>

<script>
export default {
  name: "Navbar",
  setup() {
    const logOut = () => {
      console.log('logout')
    }

    return {
      logOut
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0.5rem 1rem;

  h1 {
    margin: 0 1rem;
  }
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.links {
  display: flex;
  flex-flow: row;
  gap: 0.5rem;
  align-items: center;
}

</style>

<template>
  <Navbar />
  <div class="content">
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: { Navbar }
}
</script>

<style lang="scss">
// normal styles
.content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1rem;
}
</style>


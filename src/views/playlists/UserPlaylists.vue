<template>
  <div class="user-playlists">
    <h2 class="user-playlists__title">My Playlists</h2>
    <div v-if="playlists" class="user-playlists__playlists">
      <ListView :playlists="playlists" />
    </div>
    <div v-else class="user-playlists__none">
      <div class="error">You currently have no playlists</div>
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn user-playlists__new">Create a new playlist</router-link>
  </div>

</template>

<script>
import getCollection from '../../composables/getCollection'
import getUser from '../../composables/getUser'
import ListView from '../../components/ListView'

export default {
  name: "UserPlaylists",
  components: { ListView },
  setup() {
    const { user } = getUser()
    const { documents: playlists } = getCollection(
        'playlists',
        ['userId', '==', user.value.uid]
    )

    console.log(playlists)
    return {
      playlists
    }
  }
}
</script>

<style lang="scss" scoped>
.user-playlists {
  display: flex;
  flex-flow: column;
  gap: 1rem;

  &__title {
    padding: 1rem;
  }

  &__new {
    align-self: flex-end;
  }
}
</style>

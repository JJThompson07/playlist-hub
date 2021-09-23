<template>
  <div v-for="playlist in playlists" :key="playlist.id" class="playlist">
    <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }">
      <div class="playlist__single">
        <div class="playlist__thumbnail">
          <img class="playlist__img" :src="playlist.coverUrl">
        </div>
        <div class="playlist__info">
          <h3 class="playlist__title">{{ playlist.title }}</h3>
          <p class="playlist__creator">Created by {{ playlist.userName }}</p>
        </div>
        <div class="playlist__song-number">
          <p class="playlist__length">{{ playlist.songs.length }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    playlists: {
      type: [Array, Object],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.playlist {
  display: block;
  padding: 0.5rem;

  &__single {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem;
    background: white;
    transition: all ease-in-out 0.2s;
    border-radius: 0.6rem;
    &:hover {
      box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
      transform: scale(1.02);
    }
  }

  &__thumbnail {
    max-width: 6rem;
    max-height: 6rem;
    overflow: hidden;
    border-radius: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image {
    max-width: 150%;
    max-height: 150%;
    display: block;
  }

  &__song-number {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

</style>

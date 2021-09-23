<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
<!--    Playlist information -->
    <div class="playlist-info">
      <div class="playlist-info__cover" :style="'background-image: url(' + playlist.coverUrl + ')'">
      </div>
      <h2 class="playlist-info__title">{{ playlist.title }}</h2>
      <p class="playlist-info__username">Created by {{ playlist.userName }}</p>
      <p class="playlist-info__description">{{ playlist.description }}</p>
      <button v-if="ownership" class="playlist-info__delete" @click="handleDelete">Delete Playlist</button>
      <div v-if="deleteError" class="error">{{ deleteError }}</div>
    </div>

<!--    playlist song list-->
    <div class="song-list">
      <div v-if="playlist.songs.length" class="songs">
        <div v-for="song in playlist.songs" :key="song.id" class="songs__song">
          <div class="songs__song--details">
            <h3 class="songs__song--title">{{ song.title }}</h3>
            <p class="songs__song--artist">{{ song.artist }}</p>
          </div>
          <button v-if="ownership" @click="handleClick(song.id)">Delete</button>
        </div>
      </div>
      <div v-else>No Songs have been added to playlist yet</div>
      <AddSong v-if="ownership" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import getDocument from '../../composables/getDocument'
import getUser from '../../composables/getUser'
import useDocument from '../../composables/useDocument'
import useStorage from '../../composables/useStorage'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AddSong from '../../components/AddSong'
export default {
  name: 'PlaylistDetails',
  components: { AddSong },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { error, document: playlist } = getDocument('playlists', props.id)
    const { user } = getUser()
    const { deleteDoc, updateDoc, error: deleteError } = useDocument('playlists', props.id)
    const { deleteImage } = useStorage()
    const router = useRouter()

    const ownership = computed(() => {
      return playlist.value && user.value && user.value.uid == playlist.value.userId
    })

    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath)
      await deleteDoc()
      router.push({ name: 'Home' })
    }

    const handleClick = async (id) => {
      const songs = playlist.value.songs.filter((song) => {
        return song.id !== id
      })
      await updateDoc({
        songs: [...songs]
      })
    }

    return {
      playlist,
      error,
      ownership,
      handleDelete,
      handleClick,
      deleteError
    }

  }
}
</script>

<style lang="scss" scoped>
.playlist {
  &-details {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
  }

  &-info {
    display: flex;
    flex-flow: column;
    gap: 1rem;
    text-align: center;
    justify-content: center;
    align-items: center;

    &__cover {
      width: 100%;
      padding-top: 100%;
      background-size: cover;
      background-position: center;
      border-radius: 1.25rem;
    }
  }

}
.songs {
  display: flex;
  flex-flow: column;
  gap: 1.25rem;
  &__song {
    padding: 0.7rem 0;
    display: flex;
    gap: 1rem;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);

    &--details {
      flex: 1;
    }
  }
}

</style>

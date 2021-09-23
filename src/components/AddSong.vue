<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = !showForm">Add songs</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a new song</h4>
      <input v-model="title" type="text" placeholder="Song Title" required>
      <input v-model="artist" type="text" placeholder="Artist" required>
      <button>Add</button>
    </form>
    <div class="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '../composables/useDocument'

export default {
  name: "AddSong",
  props: {
    playlist: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const title = ref('')
    const artist = ref('')
    const showForm = ref(false)
    const { updateDoc, error } = useDocument('playlists', props.playlist.id)

    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000000)
      }
      await updateDoc({
        songs: [...props.playlist.songs, newSong]
      })
      title.value = ''
      artist.value = ''
      showForm.value = false
    }

    return {
      title,
      artist,
      showForm,
      handleSubmit,
      error
    }
  }
}
</script>

<style lang="scss" scoped>
.add-song {
  text-align: center;
  margin-top: 2.5rem;

  form {
    max-width: 100%;
  }
}
</style>

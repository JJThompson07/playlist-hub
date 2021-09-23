<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea name="" required placeholder="Playlist description..." v-model="description"></textarea>
    <label for="file">Upload playlist cover image</label>
    <input id="file" type="file" @change="handleChange" accept="image/*">

    <div v-if="fileError" class="error">{{ fileError }}</div>
    <div class="error"></div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '../../composables/useStorage'
import useCollection from '../../composables/useCollection'
import getUser from '../../composables/getUser'
import { timestamp } from '../../firebase/config'
import { useRouter } from 'vue-router'

export default {
  name: "CreatePlaylist",
  setup() {
    const title = ref('')
    const description = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const { url, filePath, uploadImage } = useStorage()
    const { error, addDoc } = useCollection('playlists')
    const { user } = getUser()
    const isPending = ref(false)
    const router = useRouter()

    // allowed file types
    const types = [
        'image/png',
        'image/jpeg',
        'image/jpg'
    ]

    const handleChange = (e) => {
      fileError.value = null
      const selected = e.target.files[0]
      if (selected && types.includes(selected.type)) {
        file.value = selected
      } else {
        file.value = null
        fileError.value = 'Please select a correct file type (png, jpg or jpeg)'
      }
    }

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true
        await uploadImage(file.value)
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp()
        })
        isPending.value = false
        if (!error.value) {
          console.log('playlist added')
          router.push({ name: 'PlaylistDetails', params: { id: res.id } })
        }
      }
    }

    return {
      title,
      description,
      handleSubmit,
      handleChange,
      fileError,
      isPending
    }
  }
}
</script>

<style lang="scss" scoped>
  input[type="file"] {
    border: 0;
    padding: 0;
  }

  label {
    font-size: 0.75rem;
    display: block;
    margin-top: 2rem;
  }
</style>

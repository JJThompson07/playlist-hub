import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {
    // put error inside to make a new error for each tie the use collection method is used, allowing for multiple
    // collections to be used
    const error = ref(null)
    const isPending = ref(false)

    const addDoc = async (doc) => {
        error.value = null
        isPending.value = true

        try {
            await projectFirestore.collection(collection).add(doc)
            isPending.value = false
        } catch(err) {
            console.log(err.message)
            error.value = 'could not send message'
            isPending.value = false
        }
    }

    return {
        error,
        addDoc,
        isPending
    }
}

export default useCollection

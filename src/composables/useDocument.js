import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useDocument = (collection, id) => {
    // put error inside to make a new error for each tie the use collection method is used, allowing for multiple
    // collections to be used
    const error = ref(null)
    const isPending = ref(false)

    let docRef = projectFirestore.collection(collection).doc(id)

    const deleteDoc = async () => {
        error.value = null
        isPending.value = true
        try {
            const res = await docRef.delete()
            isPending.value = false

            return res
        } catch(err) {
            console.log(err.message)
            error.value = 'Error: Could not delete the playlist'
            isPending.value = false
        }
    }

    const updateDoc = async (updates) => {
        error.value = null
        isPending.value = true
        try {
            const res = await docRef.update(updates)
            isPending.value = false

            return res
        } catch(err) {
            console.log(err.message)
            error.value = 'Error: Could not update the playlist'
            isPending.value = false
        }
    }

    return {
        error,
        isPending,
        deleteDoc,
        updateDoc
    }
}

export default useDocument

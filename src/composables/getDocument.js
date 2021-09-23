import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getDocument = (collection, id) => {
    // each time we use get collection use a new documents and error variable hence why inside function
    const document = ref(null)
    const error = ref(null)


    let documentRef = projectFirestore.collection(collection).doc(id)

    const unsub = documentRef.onSnapshot((doc) => {
        if (doc.data()) {
            document.value = {...doc.data(), id: doc.id}
            error.value = null
        } else {
            error.value = 'That document does not exist'
        }
    }, (err) => {
        console.log(err.message)
        document.value = null
        error.value = err.message
    })

    watchEffect((onInvalidate) => {
        // unsub from prev collection when watcher is stopped ( component is unmounted)
        onInvalidate(() => unsub())
    })

    return {
        document,
        error
    }
}

export default getDocument

import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection, query) => {
    // each time we use get collection use a new documents and error variable hence why inside function
    const documents = ref(null)
    const error = ref(null)


    let collectionRef = projectFirestore.collection(collection)
        .orderBy('createdAt')

    if (query) {
        collectionRef = collectionRef.where(...query)
    }

    const unsub = collectionRef.onSnapshot((snap) => {
        let results = []
        console.log('snapshot')

        snap.docs.forEach(doc => {
            // must use doc.data().createdAt or app will use a local version of the snapshot and timestamp - not
            // giving it a chance to be created on the server
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        })

        documents.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        documents.value = null
        error.value = err.message
    })

    watchEffect((onInvalidate) => {
        // unsub from prev collection when watcher is stopped ( component is unmounted)
        onInvalidate(() => unsub())
    })

    return {
        documents,
        error
    }
}

export default getCollection

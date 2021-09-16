import firebase from 'firebase/compat'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDElzxNj9wRhFVqECYgDXtr8uFCwcNW53c",
    authDomain: "playlist-hub-f6aa6.firebaseapp.com",
    projectId: "playlist-hub-f6aa6",
    storageBucket: "playlist-hub-f6aa6.appspot.com",
    messagingSenderId: "364661905860",
    appId: "1:364661905860:web:3c90dbc0ecb63e060dec91"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {
    projectFirestore,
    projectAuth,
    timestamp
}

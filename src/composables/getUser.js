import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

// user default = current user
const user = ref(projectAuth.currentUser)

// detect state change of the user
projectAuth.onAuthStateChanged(_user => {
    user.value = _user
})

const getUser = () => {
    return { user }
}

export default getUser

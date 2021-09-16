import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
    error.value = null
    isPending.value = true

    try {
        // request firebase user creation with email and password
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        // if (!res) {
        //     throw new Error('Could not complete the login')
        // }
        error.value = null
        isPending.value = null

        return res
    } catch (err) {
        console.log(err.message)
        isPending.value = null
        error.value = err.message
        // error.value = 'Incorrect login credentials'
    }
}

const useLogin = () => {

    return { error, login, isPending }
}

export default useLogin

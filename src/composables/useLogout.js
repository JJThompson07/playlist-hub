import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const isPending = ref(false)


const logout = async () => {
    // reset the error
    error.value = null
    isPending.value = true

    try {
        // request firebase user creation with email and password
        const res = await projectAuth.signOut()
        error.value = null
        isPending.value = false

        return res
    } catch (err) {
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }
}

const useLogout = () => {

    return { error, logout, isPending }
}

export default useLogout

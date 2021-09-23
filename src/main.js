import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.scss'

import { projectAuth } from './firebase/config'

let app

// only create app if app is not already created
projectAuth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App).use(router).mount('#app')
    }
})


import { createApp } from 'vue'
import VueGtag from 'vue-gtag'
import mitt from 'mitt'
import { createPinia } from 'pinia'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'

import '@/assets/styles/theme.scss'

const app = createApp(App)

app.use(VueGtag, {
  config: { id: 'G-9DH48XP22E' }
})

const emitter = mitt()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.config.globalProperties.emitter = emitter

app.use(Toast, {})

app.mount('#app')

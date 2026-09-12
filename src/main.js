import { createApp } from 'vue'
import { createGtag } from 'vue-gtag'
import mitt from 'mitt'
import { createPinia } from 'pinia'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'

import '@/assets/styles/theme.css'

const app = createApp(App)

app.use(createGtag({
  tagId: 'G-9DH48XP22E',
  config: { send_page_view: true }
}))

const emitter = mitt()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.config.globalProperties.emitter = emitter

app.use(Toast, {})

app.mount('#app')

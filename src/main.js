import { createApp } from 'vue'
import VueGtag from 'vue-gtag'
import mitt from 'mitt'
import { createPinia } from 'pinia'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

import App from './App.vue'

import '@/assets/styles/theme.scss'

const app = createApp(App)

const emitter = mitt()

app.use(VueGtag, {
  config: { id: 'G-9DH48XP22E' }
})

app.use(createPinia())

app.config.globalProperties.emitter = emitter

app.use(Toast, {})

app.mount('#app')

import { createApp } from 'vue'
import VueGtag from 'vue-gtag'
import mitt from 'mitt'

import App from './App.vue'

import '@/assets/styles/theme.scss'

const app = createApp(App)

const emitter = mitt()

app.use(VueGtag, {
  config: { id: 'G-9DH48XP22E' }
})

app.config.globalProperties.emitter = emitter

app.mount('#app')

import './assets/style.css'
import VueToastificationPlugin from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(VueToastificationPlugin)
app.mount('#app')

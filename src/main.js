import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './assets/router'
import App from './components/App.vue'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
import { createApp } from 'vue'
import './style.css'
import { createPinia } from '@baicie/pinia'
import App from './App.vue'

const pinia = createPinia()
pinia.use(({ store }) => {
  console.log('store', store)
})
const app = createApp(App)
app.use(pinia)
app.mount('#app')

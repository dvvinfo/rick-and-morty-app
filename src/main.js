import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

const app = createApp(App)

app.use(router)
app.component("VPagination", VPagination)

app.mount('#app')

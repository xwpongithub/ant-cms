import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局自定义样式
import '@/assets/scss/index.scss'

const app = createApp(App)

app
.use(store)
.use(router)
.mount('#app')

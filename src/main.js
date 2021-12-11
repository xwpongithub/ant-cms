import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

import './styles/index.scss'
import './permission'

import installAntd from './plugins/antd'
import installAxios from './plugins/axios'

const app = createApp(App)
app.config.productionTip = false

installAntd(app)
installAxios(app)

app
.use(store)
.use(router)
.use(i18n)
.mount('#app')

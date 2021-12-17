import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/index.scss'
import './permission'

import installAntd from './plugins/antd'
import installAxios from './plugins/axios'

import installFilter from './filter'

const app = createApp(App)
app.config.productionTip = false

installFilter(app)

installAntd(app)
installAxios(app)

app
.use(store)
.use(router)
.mount('#app')

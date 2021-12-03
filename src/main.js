import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import installAntd from './plugins/antd'

const app = createApp(App)
app.config.productionTip = false

installAntd(app)

app
.use(store)
.use(router)
.mount('#app')

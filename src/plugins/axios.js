import axios from '@/utils/request'
import VueAxios from 'vue-axios'

export default function installAntd(app) {
  app.use(VueAxios, axios)
  app.provide('axios', app.config.globalProperties.axios)
}

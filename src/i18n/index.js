import {createI18n} from 'vue-i18n'
import store from '../store'

const messages = {
  ja_JP: {
  },
  zh_CN: {
  },
  en_US: {
  }
}
const i18n = createI18n({
  // 使用composition API
  legacy: false,
  // 全局使用t函数
  globalInjection: true,
  locale: store.getters.language,
  messages
})

export default i18n

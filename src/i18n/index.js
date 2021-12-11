import {createI18n} from 'vue-i18n'

const messages = {
  ja_JP: {
  },
  zh_CN: {
  },
  en_US: {
  }
}

const locale = 'zh_CN'

const i18n = createI18n({
  // 使用composition API
  legacy: false,
  // 全局使用t函数
  globalInjection: true,
  locale,
  messages
})

export default i18n

<template>
  <div class="language-select">
    <a-dropdown trigger="click">
      <a-tooltip>
        <template #title>国际化</template>
        <translation-outlined :style="{fontSize: '24px', verticalAlign: 'middle'}"/>
      </a-tooltip>
      <template #overlay>
        <a-menu @click="handleItemClick">
          <a-menu-item key="zh_CN" :disabled="language === 'zh_CN'">
            中文
          </a-menu-item>
          <a-menu-item key="en_US" :disabled="language === 'en_US'">
            English
          </a-menu-item>
          <a-menu-item key="ja_JP" :disabled="language === 'ja_JP'">
            日本語
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
  import {TranslationOutlined} from '@ant-design/icons-vue'
  import {useStore} from 'vuex'
  import {computed, inject} from 'vue'
  import {useI18n} from 'vue-i18n'

  export default {
    name: 'LanguageSelect',
    components: {
      TranslationOutlined
    }
  }
</script>

<script setup>
const store = useStore()
const i18n = useI18n()

const $message = inject('$message')

const language = computed(() => store.getters.language)

const handleItemClick = ({key}) => {
  // 切换i18n的locale
  console.log(key)
  i18n.locale.value = key
  // 修改vuex中保存的language
  store.commit('app/setLanguage', key)
  // 提示
  $message.success('切换成功')
}
</script>

<style lang="scss" scoped>
  .language-select {
    margin-right:15px;
  }
</style>

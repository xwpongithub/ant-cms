<template>
  <a-config-provider :locale="locale">
    <router-view/>
  </a-config-provider>
</template>

<script>
import jaJP from 'ant-design-vue/es/locale/ja_JP'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
  name: 'App'
}
</script>

<script setup>
  const store = useStore()

  const locale = computed(() => {
    const language = store.getters.language
    if (language === 'en_US') {
      return enUS
    } else if (language === 'ja_JP') {
      return jaJP
    }
    return zhCN
  })
</script>

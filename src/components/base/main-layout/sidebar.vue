<template>
  <a-layout-sider :collapsed="collapsed"
                  :trigger="null"
                  collapsible
  :style="{backgroundColor: variables.menuBg}">
    <slot></slot>
  </a-layout-sider>
</template>

<script>
  import {defineProps} from 'vue'
  import variables from '@/styles/js-variables.scss'

  export default {
    name: 'Sidebar'
  }
</script>

<script setup>
const props = defineProps({
  collapsed: Boolean
})

</script>

<template>
  <a-layout>
    <sidebar :collapsed="collapsed">
      <slot name="sidebar"></slot>
    </sidebar>
    <a-layout>
      <navbar @trigger="trigger">
        <slot name="navbar"></slot>
      </navbar>
      <main-content>
        <slot name="content"></slot>
      </main-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {ref} from 'vue'
import Sidebar from './sidebar'
import Navbar from './navbar'
import MainContent from './main-content'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
    MainContent
  }
}
</script>

<script setup>
  const collapsed = ref(false)

  const trigger = value => collapsed.value = value
</script>

<style lang="scss" scoped>
.ant-layout {
  min-height:100%;
}
</style>

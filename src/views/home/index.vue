<template>
  <layout class="app-container">
    <!--左侧菜单-->
    <template #sidebar>
      <div class="sidebar-container"></div>
    </template>
    <!--顶部导航栏-->
    <template #navbar>
      <div class="navbar-container"></div>
    </template>
    <!--内容区-->
    <template #content>
      content
    </template>
  </layout>
</template>

<script>
  import Layout from '@/components/base/main-layout'

  export default {
    name: 'HomeView',
    components: {
      Layout
    }
  }
</script>

<style lang="scss" scoped>
  .ant-layout {
      min-height:100%;
  }
</style>

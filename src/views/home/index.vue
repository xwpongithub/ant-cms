<template>
  <a-layout class="layout-container">
    <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
      sidebar
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
  import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons-vue'
  import {ref} from 'vue'

  export default {
    name: 'HomeView',
    components: {
      MenuUnfoldOutlined,
      MenuFoldOutlined
    }
  }
</script>

<script setup>
const collapsed = ref(false)
</script>

<style lang="scss" scoped>
  .ant-layout {
      min-height:100%;
  }
</style>

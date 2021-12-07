<template>
  <a-layout-header>
    <menu-unfold-outlined
      v-if="collapsed"
      @click="handleCollapse(false)"
      :style="{fontSize:'20px',display: 'block'}"
    />
    <menu-fold-outlined
      :style="{fontSize:'20px', display: 'block'}"
      v-else @click="handleCollapse(true)" />
    <slot></slot>
  </a-layout-header>
</template>

<script>
  import {ref, defineEmits} from 'vue'
  import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons-vue'

  export default {
    name: 'Navbar',
    components: {
      MenuUnfoldOutlined,
      MenuFoldOutlined
    }
  }
</script>

<script setup>
  const collapsed = ref(false)
  const emits = defineEmits(['trigger'])

  const handleCollapse = value => {
    collapsed.value = value
    emits('trigger', value)
  }
</script>

<style lang="scss" scoped>
  .ant-layout-header {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 15px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
  }
</style>

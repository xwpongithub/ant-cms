<template>
  <a-layout-header style="background: #fff; padding: 0">
    <menu-unfold-outlined
      v-if="collapsed"
      @click="handleCollapse(false)"
    />
    <menu-fold-outlined v-else @click="handleCollapse(true)" />
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

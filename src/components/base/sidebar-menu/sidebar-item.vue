<template>
  <a-menu-item :key="route.name" v-if="!route.children.length">
    <template #icon>
      <icon-font :type="route.meta.icon" />
    </template>
    {{route.meta.title}}
  </a-menu-item>
  <sidebar-sub-menu v-else :route="route" :key="route.name"></sidebar-sub-menu>
</template>

<script>
  import IconFont from '@/components/icon-font'
  import {defineProps} from 'vue'
  import SidebarSubMenu from './sidebar-sub-menu'

  export default {
    name: 'SidebarItem',
    components: {
      SidebarSubMenu,
      IconFont
    }
  }
</script>

<script setup>
  defineProps({
    route: {
      type: Object,
      required: true
    }
  })
</script>

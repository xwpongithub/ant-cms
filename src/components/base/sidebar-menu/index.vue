<template>
  <a-menu mode="inline" :open-keys="openKeys">
     <sidebar-item :key="item.name" v-for="item in menus" :route="item"></sidebar-item>
  </a-menu>
</template>

<script>
  import {ref} from 'vue'
  import {useRouter} from 'vue-router'
  import SidebarItem from './sidebar-item'

  import useSidebarMenu from './use-sidebar-menu'

  export default {
    name: 'SidebarMenu',
    components: {
      SidebarItem
    }
  }
</script>

<script setup>
const router = useRouter()

const openKeys = ref([
  'workflow',
  'dmn'
])
const {
  menus
} = useSidebarMenu(router.getRoutes())
</script>

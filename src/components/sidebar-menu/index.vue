<template>
  <a-menu mode="inline" :open-keys="$store.getters.menuOpenKeys" :selected-keys="activeMenu">
     <sidebar-item :key="item.path" v-for="item in menus" :route="item"></sidebar-item>
  </a-menu>
</template>

<script>
  import {computed} from 'vue'
  import {useRouter, useRoute} from 'vue-router'
  import { filterRoutes, generateMenus } from '@/utils/route'
  import SidebarItem from './sidebar-item'

  export default {
    name: 'SidebarMenu',
    components: {
      SidebarItem
    }
  }
</script>

<script setup>
const router = useRouter()
const route = useRoute()

const menus = computed(() => {
  const filteredRoutes = filterRoutes(router.getRoutes())
  console.log('+++----')
  console.log(filteredRoutes)
  return generateMenus(filteredRoutes)
})

const activeMenu = computed(() => {
  const {name} = route
  return [name]
})
</script>

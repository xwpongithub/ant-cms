<template>
  <a-menu mode="inline" :open-keys="$store.getters.menuOpenKeys" :selected-keys="activeMenu">
     <sidebar-item :key="item.name" v-for="item in menus" :route="item"></sidebar-item>
  </a-menu>
</template>

<script>
  import {computed} from 'vue'
  import {useRouter, useRoute} from 'vue-router'
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
const route = useRoute()

const {
  menus
} = useSidebarMenu(router.getRoutes())

const activeMenu = computed(() => {
  const {name} = route
  return [name]
})
</script>

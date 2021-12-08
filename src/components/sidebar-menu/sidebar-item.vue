<template>
  <template v-if="!route.children.length">
      <a-menu-item @click="handleClick(route.path)" :key="route.name">
        <template #icon>
          <icon-font :type="route.meta.icon" />
        </template>
        {{route.meta.title}}
      </a-menu-item>
  </template>
  <sidebar-sub-menu v-else :route="route" :key="route.name"></sidebar-sub-menu>
</template>

<script>
  import {useRouter} from 'vue-router'
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

  const router = useRouter()

  const handleClick = path => {
    router.push({
      path
    })
  }
</script>

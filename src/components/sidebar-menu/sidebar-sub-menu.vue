<template>
<!--  <router-link :to="route.path">-->
    <a-sub-menu :key="route.name" @title-click="handleTitleClick(route.path)">
      <template #icon>
        <icon-font :type="route.meta.icon"/>
      </template>
      <template #title>{{route.meta.title}}</template>

      <template v-for="item in route.children" :key="item.name">
        <template v-if="!item.children.length">
            <a-menu-item :key="item.name" @click="handleMenuItemClick(item.path)">
              <template #icon>
                <icon-font :type="item.meta.icon"/>
              </template>
              {{item.meta.title}}
            </a-menu-item>
        </template>
        <sidebar-sub-menu v-else :route="item" :key="item.name"/>
      </template>
    </a-sub-menu>
<!--  </router-link>-->
</template>

<script>
  import {useRouter} from 'vue-router'
  import IconFont from '@/components/icon-font'
  import {defineProps} from 'vue'

  export default {
    name: 'SidebarSubMenu',
    components: {
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

  const handleTitleClick = path => {
    router.push({path})
  }
  const handleMenuItemClick = path => {
    router.push({path})
  }
</script>

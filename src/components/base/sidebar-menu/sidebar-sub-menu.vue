<template>
  <a-sub-menu :key="route.name">
    <template #icon>
      <icon-font :type="route.meta.icon"/>
    </template>
    <template #title>{{route.meta.title}}</template>
    <template v-for="item in route.children" :key="item.name">
      <template v-if="!item.children.length">
        <a-menu-item :key="item.name">
          <template #icon>
            <icon-font :type="item.meta.icon"/>
          </template>
          {{item.meta.title}}
        </a-menu-item>
      </template>
      <sidebar-sub-menu v-else :route="item" :key="item.name"/>
    </template>
  </a-sub-menu>
</template>

<script>
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
</script>

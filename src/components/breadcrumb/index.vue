<template>
  <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in list" :key="item.name">
        <template v-if="index === list.length - 1">
          {{item.meta.title}}
        </template>
        <template v-else>
          <router-link :to="item.path">{{item.meta.title}}</router-link>
        </template>
        <template v-if="item.children.length" #overlay>
          <a-menu>
            <a-menu-item @click="handleSubRouteClick(subRoute.path)" v-for="subRoute in item.children" :key="subRoute.name">
              {{subRoute.meta.title}}
            </a-menu-item>
          </a-menu>
        </template>
      </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import {ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'

export default {
  name: 'Breadcrumb'
}
</script>

<script setup>
const route = useRoute()
const router = useRouter()
const list = ref([])

watch(route, newRoute => {
  list.value = newRoute.matched.filter(item => item.meta && item.meta.title && item.meta.icon)
}, {
  immediate: true
})

const handleSubRouteClick = path => router.push({path})
</script>

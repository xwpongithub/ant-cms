<template>
  <div class="tags-view-container">
    <div class='tags-view-wrapper'>
      <router-link class="tags-view-item" :class="isActive(tag) ? 'active' : ''"
                   v-for="(tag, index) in $store.getters.tagsViewList"
                   :key="index"
                   :to="tag.path"
                   :style="{
                     backgroundColor: isActive(tag) ? $store.getters.cssVars.menuBg: '',
                     borderColor: isActive(tag) ? $store.getters.cssVars.menuBg: ''
                   }"
                   @contextmenu.prevent="openContextMenu($event, index)"
      >
        <span>{{tag.title}}</span>
        <close-circle-filled v-show="!isActive(tag)" @click.prevent.stop="handleCloseClick(index)"/>
      </router-link>
      <tag-context-menu :index="selectedIndex" v-show="showContextMenu" :style="contextMenuStyle"/>
    </div>
  </div>
</template>

<script>
  import {ref, watch} from 'vue'
  import {useRoute} from 'vue-router'
  import {useStore} from 'vuex'
  import {CloseCircleFilled} from '@ant-design/icons-vue'
  import TagContextMenu from './tag-context-menu'

  export default {
    name: 'TagsView',
    components: {
      CloseCircleFilled,
      TagContextMenu
    }
  }
</script>

<script setup>
  const route = useRoute()
  const store = useStore()

  const showContextMenu = ref(false)
  const contextMenuStyle = ref({
    left: 0,
    top: 0
  })
  const selectedIndex = ref(0)

  const isActive = tag => tag.name === route.name

  const handleCloseClick = index => {
    store.commit('app/removeTagsView', {
      type: 'index',
      index
    })
  }

  const openContextMenu = (e, tagIndex) => {
    const {x, y} = e
    const menuStyleVal = contextMenuStyle.value
    menuStyleVal.left = x + 'px'
    menuStyleVal.top = y + 'px'
    selectedIndex.value = tagIndex
    showContextMenu.value = true
  }

  const closeMenu = () => showContextMenu.value = false

  watch(showContextMenu, val => {
    if (val) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  })
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 44px;
  width: 100%;
  background: #fff;
  box-shadow: 0 3px 2px rgba(0,21,41,.2);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 36px;
      line-height: 36px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        color:#fff;
        &::before {
          content: '';
          background-color: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 4px;
        }
      }
      // close 按钮
      .anticon-close-circle {
        width: 16px;
        height: 16px;
        line-height: 10px;
        vertical-align: middle;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
}
</style>

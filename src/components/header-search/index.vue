<template>
  <div class="header-search">
    <search-outlined :style="{fontSize: '24px',cursor: 'pointer',verticalAlign:'middle'}" @click.stop="toggleSelect" />
    <transition name="slide">
      <a-select
        v-show="showSelect"
        ref="selectRef"
        @change="handleChange"
        @blur="showSelect=false"
        @search="fetchContent"
        :filter-option="false"
        :show-arrow="false"
        :show-search="true"
        :options="searchOptions"
        placeholder="搜索"
        v-model:value="keyword"
        class="header-search-select">
        <template #notFoundContent>
            <div class="no-data" style="text-align:center">
              <span>没有数据</span>
            </div>
        </template>
      </a-select>
    </transition>
  </div>
</template>

<script>
  import Fuse from 'fuse.js'
  import {useRouter} from 'vue-router'
  import {SearchOutlined} from '@ant-design/icons-vue'
  import {ref, computed, watch, nextTick} from 'vue'
  import {filterRoutes, generateSearchRoutes} from '@/utils/route'

  export default {
    name: 'HeaderSearch',
    components: {
      SearchOutlined
    }
  }
</script>

<script setup>
  const router = useRouter()
  const keyword = ref(undefined)
  const list = ref([])
  const showSelect = ref(false)
  const searchOptions = ref([])
  const selectRef = ref(null)

  const searchPool = computed(() => {
    const routes = filterRoutes(router.getRoutes())
    return generateSearchRoutes(routes)
  })

  function initFuse(data) {
    // 构建模糊查询菜单数据源
    return new Fuse(data, {
      // 是否按照优先级排序
      shouldSort: true,
      // 匹配长度超过这个值的才会被认为是匹配的
      minMatchCharLength: 1,
      // name: 搜索的健
      // weight: 对应的权重
      keys: [
        {
          name: 'title',
          weight: 0.7
        },
        {
          name: 'path',
          weight: 0.3
        }
      ]
    })
  }

  const fuse = initFuse(searchPool.value)

  const toggleSelect = async () => {
    const showSelectVal = showSelect.value = !showSelect.value
    if (showSelectVal) {
      await nextTick()
      selectRef.value.focus()
    }
  }

  const fetchContent = keyword => {
    if (keyword) {
      const rs = fuse.search(keyword)
      searchOptions.value = rs.map(option => ({
        label: option.item.title.join(' > '),
        value: option.item.path
      }))
    }
  }
  const handleChange = path => {
    router.push({path})
  }

  watch(showSelect, val => {
    if (val) {
      document.body.addEventListener('click', handleClose)
    } else {
      document.body.removeEventListener('click', handleClose)
    }
  })

  const handleClose = async (e) => {
    await nextTick()
    // 触发click的元素不是搜索框本身的话就关闭搜索框
    if (!e.target.classList.contains('ant-select-selection-search-input')) {
      searchOptions.value = []
      keyword.value = undefined
      showSelect.value = false
      selectRef.value.blur()
    }
  }
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .header-search-select {
    width:200px;
    margin-left:5px;
    font-size: 18px;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    :deep(.ant-select-selector) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
      .ant-select-selection-placeholder {
        margin-left:10px;
      }
    }
    &.slide-enter-active,&.slide-leave-active {
      transition: width 0.2s;
    }
    &.slide-enter-from,&.slide-leave-to {
      width: 0;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>

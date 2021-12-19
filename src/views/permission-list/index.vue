<template>
  <div class="permission-container">
    <a-card class="permission-list">
        <a-table :pagination="false"
                 :bordered="true"
                 style="width:100%;"
                 :columns="columns"
                 :data-source="permissionData"
                 :defaultExpandAllRows="true"
                 :row-selection="rowSelection"
        ></a-table>
    </a-card>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {permissionList} from '@/api/permission'

const columns = [
  {
    title: '权限名称',
    dataIndex: 'permissionName',
    key: 'name'
  },
  {
    title: '权限标识',
    dataIndex: 'permissionMark',
    key: 'mark'
  },
  {
    title: '权限描述',
    dataIndex: 'permissionDesc',
    key: 'desc'
  }
]

const rowSelection = ref({
  checkStrictly: true,
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
})
const permissionData = ref([])
const getPermissionList = async () => {
  const data = await permissionList()
  data.forEach(item => addKeyToEachItem(item))
  permissionData.value = data
}
getPermissionList()

const addKeyToEachItem = item => {
  item.key = parseInt(item.id.replace('-', ''))
  if (item.children && item.children.length) {
    item.children.forEach(child => addKeyToEachItem(child))
  }
}
</script>

<style lang="scss" scoped>
.permission-container {
  .permission-list {
    margin:15px 15px 0 15px;
  }
}
</style>

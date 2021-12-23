<template>
  <div class="role-container">
    <a-card class="role-list" hoverable>
      <a-table
        :pagination="false"
        :data-source="roleData"
        :columns="columns"
        :bordered="true"
        style="width:100%">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <div class="actions" v-permission="['distributePermission']">
              <a-button type="primary" @click="distPerms(record)">分配权限</a-button>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>
    <dist-permission :role-id="selectRoleId" :visible="visible" @close="handleModalClose"/>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import {roleList} from '@/api/role'
import DistPermission from './components/dist-permssion'

const visible = ref(false)
const roleData = ref([])
const selectRoleId = ref('')
const columns = [
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '描述',
    dataIndex: 'describe',
    key: 'describe'
  },
  {
    title: '操作',
    key: 'action',
    width: 50
  }
]

const getRoleList = async () => roleData.value = await roleList()

getRoleList()

const distPerms = row => {
  visible.value = true
  selectRoleId.value = row.id
}

const handleModalClose = () => {
  visible.value = false
}
watch(visible, val => {
  if (!val) selectRoleId.value = ''
})

</script>

<style lang="scss" scoped>
  .role-container {
    .role-list {
      margin:15px 15px 9px 15px;
    }
  }
</style>

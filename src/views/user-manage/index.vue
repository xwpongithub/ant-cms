<template>
  <div class="user-manage-container">
    <a-card hoverable class="header">
      <a-button type="primary" v-permission="['importUser']">excel导入</a-button>
      <a-button>excel导出</a-button>
    </a-card>
    <a-card class="body">
      <a-table
        :pagination="false"
        :data-source="tableData"
        :columns="columns"
        :bordered="true"
        style="width:100%">

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'avatar'">
            <a-image :preview="false" :width="60" :height="60" :src="record.avatar"/>
          </template>

          <template v-if="column.key === 'tags'">
            <template v-if="record.role && record.role.length">
              <a-tag v-for="item in record.role" :key="item.id">{{item.title}}</a-tag>
            </template>
            <template v-else>
              未设置任何角色
            </template>
          </template>

          <template v-if="column.key === 'openTime'">
            {{$filters.dateFilter(record.openTime)}}
          </template>

          <template v-if="column.key === 'action'">
            <div class="actions">
              <a-button type="primary">查看</a-button>
              <a-button @click="showRoleList(record)" v-permission="['distributeRole']">角色</a-button>
              <a-button type="ghost" v-permission="['removeUser']">删除</a-button>
            </div>
          </template>
        </template>

      </a-table>

      <a-pagination
        :current="current"
      :total="total"
      :page-size="size"
      show-size-changer
      show-quick-jumper
      :page-size-options="pageSizeOptions"
      @change="handleChange"
      @show-size-change="handleShowSizeChange">
      </a-pagination>

    </a-card>

    <roles
      @update-role="handleRoleUpdate"
      :visible="roleModalVisible"
      @close="onModalClosed"
      :user-id="selectUserId"></roles>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getUserManageList } from '@/api/user-manage'
import Roles from './components/roles'

const tableData = ref([])
const total = ref(0)
const current = ref(1)
const size = ref(2)
const selectUserId = ref(null)
const pageSizeOptions = ref(['10', '20', '30', '40', '50'])
const roleModalVisible = ref(false)

const columns = [
  {
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
    width: 120
  },
  {
    title: '开通手机号',
    dataIndex: 'mobile',
    key: 'mobile',
    width: 120
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 70
  },
  {
    title: '角色',
    key: 'tags',
    dataIndex: 'role'
  },
  {
    title: '时间',
    key: 'openTime',
    dataIndex: 'openTime',
    width: 120
  },
  {
    title: '操作',
    key: 'action',
    width: 140
  }
]

const getListData = async () => {
  const rs = await getUserManageList({
    page: current.value,
    size: size.value
  })
  tableData.value = rs.list
  total.value = rs.total
}

getListData()

const handleShowSizeChange = (current, size) => {
  current.value = current
  size.value = size
  getListData()
}
const handleChange = (page, pageSize) => {
  current.value = page
  size.value = pageSize
  getListData()
}
const showRoleList = row => {
  roleModalVisible.value = true
  console.log(row._id)
  selectUserId.value = row._id
}
const onModalClosed = () => {
  roleModalVisible.value = false
}
const handleRoleUpdate = () => getListData()

watch(roleModalVisible, val => {
  if (!val) selectUserId.value = ''
})
</script>

<style lang="scss" scoped>
  .user-manage-container {
    .header,.body {
      margin:15px 15px 0 15px;
      .ant-btn:not(:last-child) {
        margin-right:10px;
      }
    }
    .body {
      :deep(.ant-image) .ant-image-img {
        border-radius: 50%;
      }
      :deep(.ant-table-cell) .actions {
        width:100%;
        display:flex;
        justify-content: center;
      }
      .ant-pagination {
        margin-top: 15px;
        text-align:center;
      }
    }
  }
</style>

<template>
  <a-modal
    title="配置角色"
    v-bind:visible="visible"
    @cancel="handleCancel">

    <a-checkbox-group v-model:value="userRoleTitleList">
      <a-row>
        <a-col v-for="item in allRoleList" :key="item.id">
          <a-checkbox :value="item.id">
            {{item.title}}
          </a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group>

    <template #footer>
      <div class="modal-footer">
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleConfirm">确定</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
import { ref, watch, inject } from 'vue'
import {userRoles, updateRole} from '@/api/user-manage'
import {roleList} from '@/api/role'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String
  }
})

const $message = inject('$message')
const emits = defineEmits(['close', 'updateRole'])
const userRoleTitleList = ref([])
const allRoleList = ref([])

const handleCancel = () => {
  emits('close')
}
const handleConfirm = async () => {
  const roles = userRoleTitleList.value.map(roleId => allRoleList.value.find(role => roleId === role.id))
  await updateRole(props.userId, roles)
  $message.success('更新成功')
  emits('updateRole')
  handleCancel()
}

const getListData = async () => {
  allRoleList.value = await roleList()
}
getListData()

const getUserRoles = async () => {
  const rs = await userRoles(props.userId)
  console.log(rs.role.map(item => item.id))
  userRoleTitleList.value = rs.role.map(item => item.id)
}
watch(() => props.userId, val => {
  if (val) {
    getUserRoles()
  }
})
</script>

<style lang="scss" scoped></style>

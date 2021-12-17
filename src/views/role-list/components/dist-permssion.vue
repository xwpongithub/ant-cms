<template>
  <a-modal
    title="分配权限"
    v-bind:visible="visible"
    @close="closed"
  >
    <a-tree
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            v-model:checkedKeys="checkedKeys"
            checkable
            :tree-data="allPermission"
            :field-names="fieldNames"
            :default-expand-all="true"
    ></a-tree>

    <template #footer>
      <div class="modal-footer">
        <a-button @click="closed">取消</a-button>
        <a-button type="primary" @click="onConfirm">确定</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
import { ref, watch, inject } from 'vue'
import { permissionList } from '@/api/permission'
import { distPermission, rolePermission } from '@/api/role'

const fieldNames = {
  title: 'permissionName'
}

const props = defineProps({
  roleId: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['close'])
const $message = inject('$message')
const expandedKeys = ref([])
const selectedKeys = ref([])
const checkedKeys = ref([])
// 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  const rs = await permissionList()
  rs.forEach(item => addKeyToEachItem(item))
  allPermission.value = rs
}
getPermissionList()

// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

// 获取当前用户角色的权限
const getRolePermission = async () => {
  checkedKeys.value = await rolePermission(props.roleId)
}

watch(
  () => props.roleId,
  val => {
    if (val) getRolePermission()
  }
)

/**
 确定按钮点击事件
 */
const onConfirm = async () => {
  await distPermission({
    roleId: props.roleId,
    permissions: checkedKeys.value
  })
  $message.success('用户角色更新成功')
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('close')
}

const addKeyToEachItem = item => {
  item.key = item.id
  if (item.children && item.children.length) {
    item.children.forEach(child => addKeyToEachItem(child))
  }
}

watch(expandedKeys, () => {
  console.log('expandedKeys', expandedKeys)
})
watch(selectedKeys, () => {
  console.log('selectedKeys', selectedKeys)
})
watch(checkedKeys, () => {
  console.log('checkedKeys', checkedKeys)
})
</script>

<style lang="scss" scoped></style>

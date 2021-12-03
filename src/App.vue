<template>
  <div>
    <button @click="handleClick">click</button>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
  name: 'App'
}
</script>

<script setup>
const ins = getCurrentInstance()

const handleClick = () => {
  const {$message} = ins.appContext.config.globalProperties
  $message.info('hello ant-cms')
}
</script>

<template>
  <div>
    控制台<br>
    <a-pagination v-model:current="current" :total="500" />
  </div>
</template>

<script>
  export default {
    name: 'ConsoleView',
    data() {
      return {
        current: 6
      }
    }
  }
</script>

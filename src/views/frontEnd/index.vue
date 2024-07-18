<template>
  <div class="container">
    <p v-html="content" class="content"></p>
  </div>

</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { requestHtml } from '../../utils/getHtml'
let content = ref('')

onMounted(() => getResource())

const getResource = async () => {
  let name = '数据结构与算法'
  let result = await requestHtml(name)
  content.value = result.data
}
</script>

<style lang="scss" scoped>
.container {
  background-color: $base-main-bg-color;

  .content {
    padding: 0 25px;
  }
}
</style>
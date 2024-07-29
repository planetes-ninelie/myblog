<template>
  <div class="container">
    <p v-html="content" class="content"></p>
  </div>

</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { requestHtml } from '../../utils/getHtml'
//引入el加载组件
import { ElLoading } from 'element-plus';
import { nextTick } from 'vue';
let content = ref('')

onMounted(() => getResource())

//获取html页面
const getResource = async () => {
  let options = {
    fullscreen: true
  }
  const loadingInstance = ElLoading.service(options)
  let name = '数据结构与算法'
  let result = await requestHtml(name)
  content.value = result.data
  nextTick(() => {
    loadingInstance.close()
  })
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
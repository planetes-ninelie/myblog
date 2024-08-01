<template>
  <p v-html="content" class="content"></p>
  <div class="navigationBar">
    <navigationBar></navigationBar>
  </div>
  <div class="menu">
    <menuNav></menuNav>
  </div>
</template>

<script setup lang="ts">
import menuNav from './layout/menuNav/index.vue'
import navigationBar from './layout/navigationBar/index.vue'
import { computed, onMounted, ref } from 'vue';
import { requestHtml } from '@/utils/getHtml'
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
.content {
  margin: 0 auto;
}

.menu {
  position: fixed;
  z-index: 99;
  left: 20px;
  bottom: 100px;
  top: 150px;
  width: 150px;
  height: 200px;
  background-color: gray;
}

.navigationBar {
  position: fixed;
  z-index: 99;
  right: 20px;
  bottom: 100px;
  width: 100px;
  height: 200px;
  background-color: gray;
}
</style>
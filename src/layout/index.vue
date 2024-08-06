<template>
  <div class="layout_container" :class="background">
    <div class="top">
      <top @notify-parent="changeBg"></top>
    </div>
    <div class="content">
      <content></content>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { reqPicture } from '../api/test';
import { onMounted, watch, nextTick } from 'vue'
import top from './top/index.vue'
import content from './content/index.vue'
//引入el加载组件
import { ElLoading } from 'element-plus';

const background = ref('bg1')
onMounted(async () => {
  // let options = {
  //   fullscreen: true
  // }
  // const loadingInstance = ElLoading.service(options)
  changeBg()

  // nextTick(() => {
  //   loadingInstance.close()
  // })
})

const changeBg = (bg = true) => {
  background.value = bg ? 'bg1' : 'bg2'
}

</script>

<style lang="scss" scoped>
.layout_container {
  bottom: 0;
  z-index: 99;
  transition: background-image 1s;

  .top {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: $base-tabbar-height;
    background: $base-tabbar-background-color;
    color: $base-text-color;
  }

  .content {
    width: 100%;
    height: 100%;
    padding-top: $base-tabbar-height;
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
}

.bg1 {
  background: url('../assets/img/background-image-3.png') center / cover no-repeat fixed;
}

.bg2 {
  background: url('../assets/img/background-image-4.png') center / cover no-repeat fixed;
}
</style>
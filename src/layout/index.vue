<template>
  <div class="layout_container" :style="{ backgroundImage: `url(${currentBackground})` }">
    <div class="top">
      <top ref="bg" @notify-parent="changeBg"></top>
    </div>
    <div class="content">
      <content></content>
    </div>
  </div>
  <!-- <div class="layout_container">
    <div class="top">
      <top ref="bg" @notify-parent="changeBg"></top>
    </div>
    <div class="content">
      <content></content>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { reqPicture } from '../api/test';
import { onMounted, watch } from 'vue'
import top from './top/index.vue'
import content from './content/index.vue'
import bg1 from '../assets/img/background-image-3.png'
import bg2 from '../assets/img/background-image-4.png'
let bg = ref()
const backgrounds = [bg2, bg1]
let currentBackground = ref('')
onMounted(() => {
  changeBg()
})

const changeBg = (data) => {
  currentBackground.value = backgrounds[bg.value.bgId]
}

</script>

<style lang="scss" scoped>
.layout_container {
  // background-image: url('../assets/img/background-image-3.png');
  background-position: center;
  background-repeat: repeat;
  background-attachment: fixed;
  background-color: transparent;
  background-clip: border-box;
  background-size: cover;
  bottom: 0;
  // height: 100%;

  .top {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: $base-tabbar-height;
    background: $base-tabbar-background-color;
    color: $base-text-color;
  }

  .content {
    padding-top: $base-tabbar-height;
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
</style>
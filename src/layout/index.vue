<template>
  <div class="layout_container" :style="{ backgroundImage: `url(${currentBackground})` }">
    <div class="top">
      <top ref="bg" @notify-parent="changeBg"></top>
    </div>
    <div class="content">
      <content></content>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { reqPicture } from '../api/test';
import { onMounted, watch } from 'vue'
import top from './top/index.vue'
import content from './content/index.vue'
let bg = ref()
const backgrounds = [
  'public/img/background-image-4.png',
  'public/img/background-image-3.png'
]
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
  background-position: center;
  background-repeat: repeat;
  background-attachment: fixed;
  background-color: transparent;
  background-clip: border-box;
  background-size: cover;
  bottom: 0;

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
}
</style>
<template>
  <!-- <div @click="goBack">返回列表</div>
  <div>{{ isMd }}</div> -->
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
// 使用defineEmits创建名称，接受一个数组
const emit = defineEmits(['isMdChild'])

defineProps({
  isMd: String
});

const goBack = () => {
  if (isMd == 'true') {
    //传递给父组件
    emit('isMdChild', false)
  } else {
    ElMessage({
      message: '已经在笔记列表了！',
      type: 'success',
      plain: true,
    })
  }
}

</script>

<style lang="scss" scoped>
div {
  color: white;

  &:hover {
    cursor: pointer;
    color: $base-text-color3;
    font-size: large;
  }
}
</style>
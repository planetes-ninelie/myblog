<template>
  <el-button @click="goBack" class="button" type="success">返回列表</el-button>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
// 使用defineEmits创建名称，接受一个数组
const emit = defineEmits(['isMdChild'])

//接收父组件的值
const fatherParams = defineProps({
  isMd: Boolean
});

const goBack = () => {
  if (fatherParams.isMd) {
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
button {


  &:hover {
    cursor: pointer;
    color: $base-text-color3;
    font-size: large;
  }
}
</style>
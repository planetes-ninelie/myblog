<template>
  <svg :style="{ width: width, height: height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
//接受父组件传递过来的参数
defineProps({
  //xlink:href属性值前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  //提供使用的图标名字
  name: String,
  //接受父组件传递颜色
  color: {
    type: String,
    default: 'black'
  },
  //接收父组件传递过来的图标宽度
  width: {
    type: String,
    default: '16px'
  },
  //接收父组件传递过来的图标高度
  height: {
    type: String,
    default: '16px'
  }
})
</script>

<style lang="scss" scoped></style>

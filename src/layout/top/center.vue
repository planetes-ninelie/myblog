<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由的情况 -->
    <template v-if="!item.children && item.meta.isMenu">
      <el-menu-item :index="item.path" @click="goRoute">
        <!-- <SvgIcon class="arrow-down" :name="route.meta.icon" width="50px" height="50px" @click="scrollDown" />首页 -->
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
    <!-- 有子路由的情况 -->
    <template v-if="item.children && item.meta.isMenu">
      <el-sub-menu :index="item.path">
        <template #title>
          <!-- <SvgIcon class="arrow-down" :name="route.meta.icon" width="50px" height="50px" @click="scrollDown" />前端学习 -->
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menu-list="item.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

//获取父组件传递过来的全部路由数组
defineProps(['menuList'])

let $router = useRouter()
//点击菜单的回调
const goRoute = (vc: any) => {
  $router.push(vc.index)
  console.log(vc.index);
}
</script>

<script lang="ts">
//暴露组件
export default {
  name: 'Menu',
}
</script>

<style lang="scss" scoped>
.el-menu--horizontal,
.el-menu {
  border-bottom: 0px;
}
</style>
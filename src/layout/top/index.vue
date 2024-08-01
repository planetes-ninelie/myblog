<template>
  <div class="container">
    <div class="left">
      <img src="../../assets/img/avatar.jpg" alt="" class="logo">
      <text>{{ settings.title }}</text>
    </div>
    <div class="center">
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" text-color="grey"
        background-color="rgb(29, 48, 66)" active-text-color="azure" :popper-offset="0">
        <center :menu-list="routes"></center>
      </el-menu>
    </div>
    <div class="right">
      <el-switch v-model="bg" class="ml-2" inline-prompt width="60px"
        style="--el-switch-on-color: $base-text-color; --el-switch-off-color: rgba(29, 48, 66, 0.5)" active-text="泷"
        inactive-text="三叶" @change="handleBg" />
      <el-switch v-model="value2" class="ml-2" inline-prompt
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-text="Y" inactive-text="N" />
    </div>
  </div>
</template>

<script setup lang="ts">
import settings from '../../settings';
import center from './center.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { constantRoutes } from '@/router/routes.ts';

//设置活动路由
let $router = useRouter()

//处理背景图切换
let bg = ref(true)
let bgId = ref(1)
const value2 = ref(true)
const emit = defineEmits(['notify-parent']);
const handleBg = (value) => {
  bgId.value = value ? 1 : 0
  emit('notify-parent', bgId.value);
}
defineExpose({ bgId })

//获取常量路由
const routes = constantRoutes[0].children
console.log('routes', routes);
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 50px;

  .left {
    flex: 1;
    display: flex;
    align-items: center;

    .logo {
      height: calc($base-tabbar-height*0.7);
      margin: 0 10px;
      border-radius: 50%;
    }
  }

  .center {
    flex: 2;

    .el-menu-demo {
      margin-left: 15%;
      height: 40px;
      background: $base-tabbar-background-color;

      .svg-icon {
        padding-right: 2px
      }
    }
  }

  .right {
    flex: 1;
    align-items: center;
    display: flex;
    justify-content: end;

    .ml-2 {
      margin-right: 20px;
    }
  }
}
</style>
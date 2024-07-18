<template>
  <div class="container">
    <div class="left">
      <img src="../../assets/img/avatar.jpg" alt="" class="logo">
      <text>{{ settings.title }}</text>
    </div>
    <div class="center">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" text-color="grey"
        background-color="rgb(29, 48, 66)" active-text-color="azure" :popper-offset="0">
        <el-menu-item index="/" @click="goRoute">
          <el-icon>
            <House />
          </el-icon>首页
        </el-menu-item>
        <el-sub-menu index="/frontEnd">
          <template #title>
            <el-icon>
              <Notebook />
            </el-icon>前端学习
          </template>
          <el-menu-item index="/frontEnd" @click="goRoute">测试html</el-menu-item>
          <!-- <el-menu-item index="/frontEnd" @click="goRoute">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1" @click="goRoute">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-sub-menu> -->
        </el-sub-menu>
        <el-menu-item index="/others" @click="goRoute">
          <el-icon>
            <Picture />
          </el-icon>其他
        </el-menu-item>
        <!-- <el-sub-menu index="/other">
          <template #title>其他</template>
          <el-menu-item index="3-1">item one</el-menu-item>
          <el-menu-item index="3-2">item two</el-menu-item>
          <el-menu-item index="3-3">item three</el-menu-item>
        </el-sub-menu> -->
        <el-menu-item index="/about" @click="goRoute">
          <el-icon>
            <User />
          </el-icon>关于
        </el-menu-item>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

let $router = useRouter()

const activeIndex = ref('/')
//点击菜单的回调
const goRoute = (vc: any) => {
  $router.push(vc.index)
  console.log(vc.index);
}
let bg = ref(true)
let bgId = ref(1)
const value2 = ref(true)

const emit = defineEmits(['notify-parent']);
const handleBg = (value) => {
  bgId.value = value ? 1 : 0
  emit('notify-parent', bgId.value);
}

defineExpose({ bgId })

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;

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
      height: 95%;
      background: $base-tabbar-background-color;

      .svg-icon {
        padding-right: 2px
      }
    }

    .el-menu--horizontal,
    .el-menu {
      border-bottom: 0px;
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
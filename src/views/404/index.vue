<template>
  <div class="box">
    <div class="top">
      <img src="../../assets/img/404.png" alt="" />
    </div>
    <div class="bottom">
      <el-link @click="goHome" class="link">回到首页（{{ countdown }}秒）</el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref, onUnmounted } from 'vue';

let $router = useRouter()
let countdown = ref(3)
const goHome = () => {
  $router.push('/home')
}
onMounted(() => {
  const timer = setTimeout(() => {
    $router.push('/');
    countdown.value = 0; // 设置为0以停止倒计时显示
  }, 3000);

  // 开始倒计时
  const interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(interval); // 清除间隔器，避免内存泄漏
    }
  }, 1000);

  // 确保清除定时器，避免组件卸载时内存泄漏
  onUnmounted(() => {
    clearTimeout(timer);
    clearInterval(interval);
  });
});


</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 650px;

  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85%;

    img {
      width: 700px;
    }
  }

  .bottom {
    display: flex;
    justify-content: center;

    .link {
      font-size: 20px;
    }
  }
}
</style>

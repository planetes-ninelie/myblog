<template>
  <div class="body">
    <div class="top">
      <p v-for="(line, index) in lines" :key="index" class="animation">
        <span class="masked-text">{{ line }}</span>
      </p>
    </div>
    <div class="container">
      内容
    </div>
  </div>
</template>

<script setup lang="ts">
const lines = [
  '那天 流星划过天际 那就像',
  '就像 梦一样的景色',
  '只一心觉得 景色好美'
];
</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  height: $base-main-height;

  .top {
    margin: 0 150px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: $base-text-color;
    font-size: 50px;

    p {
      white-space: nowrap;
      position: relative;
      /* 添加相对定位，以便于放置伪元素 */
      overflow: hidden;
      /* 隐藏超出容器的内容 */

      &:after {
        /* 创建光标 */
        content: '|';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        animation: blink 500ms steps(1, end) infinite;
      }
    }

    .animation {
      animation: grow 4s linear forwards,
        /* 使用线性插值函数 */
        blink 500ms steps(1, end) infinite;

      @keyframes grow {
        from {
          width: 0;
        }

        to {
          width: 100%;
        }
      }

      @keyframes blink {

        from,
        to {
          border-right-color: transparent;
        }

        50% {
          border-right-color: #eee;
        }
      }
    }
  }

  .container {
    height: 160px;
  }
}
</style>
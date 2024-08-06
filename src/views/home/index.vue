<template>
  <div class="body">
    <div class="top">
      <div v-for="(line, index) in lines" :key="index" class="lines">
        <span class="animation" :style="{
          '--animation-delay': `${index * 2}s`,
          '--after-delay': `${index * 2}s`
        }">
          {{ line }}&nbsp;
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义响应式数据
const lines = ref([
  '那天 流星划过天际 那就像',
  '就像 梦里的景色',
  '只知道 天空好美'
]);
</script>

<style lang="scss" scoped>
.body {
  height: $base-main-height;

  .top {
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $base-text-color;
    font-size: 50px;

    .lines {
      display: flex;
      justify-content: center;

      .animation {
        position: relative;
        overflow: hidden;
        width: 0;
        padding: 30px 0;
        margin: 0 auto;
        font-size: 40px;
        line-height: 45px;
        white-space: nowrap;
        animation-delay: var(--animation-delay) !important;
        animation: width 2s steps(15) forwards;

        &::after {
          content: "";
          position: absolute;
          right: 0px;
          height: 45px;
          border-right: 2px solid #ffffff;
          animation-delay: var(--after-delay) !important;
          animation: showInfinite 0.75s 3 both;

          @keyframes showInfinite {

            0%,
            50% {
              opacity: 1;
            }

            100% {
              opacity: 0;
            }
          }
        }

        @keyframes width {
          0% {
            width: 0;
          }

          100% {
            width: 100%;
          }
        }
      }

      &:last-child .animation::after {
        animation: showInfinite 1s infinite both;
      }
    }
  }
}
</style>
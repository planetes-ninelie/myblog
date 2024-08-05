<template>
  <!-- <p v-html="content" class="content"></p> -->
  <MdEditor v-model="mdText" v-if="isMd" class="mdEditor"></MdEditor>
  <div v-else class="mdEditor">
    <el-card v-for="type in MdType" class="card" shadow="always">
      <template #header>
        <div class="type">
          {{ type }}
        </div>
      </template>
      <div v-for="item in data">
        <div v-if="item.type == type" class="title" @click="selectMd(item.title)">
          {{ item.title }}
        </div>
      </div>
    </el-card>
  </div>
  <div class="navigationBar">
    <navigationBar :isMd="isMd" @isMdChild="goBack" class="navigationBar-content"></navigationBar>
  </div>
  <div class="menu">
    <menuNav></menuNav>
  </div>
</template>

<script setup lang="ts">
import menuNav from './layout/menuNav/index.vue'
import navigationBar from './layout/navigationBar/index.vue'
import { computed, onMounted, ref } from 'vue';
import { requestHtml, data, requestMd } from '@/utils/getHtml'
//引入el加载组件
import { ElLoading } from 'element-plus';
import { nextTick } from 'vue';
// markdown样式
import "github-markdown-css";
// 代码高亮
import "highlight.js/styles/github.css"; //默认样式
import 'md-editor-v3/lib/style.css';
import { MdEditor } from 'md-editor-v3';

//html文件内容
let content = ref('')
//md文件内容
let mdText = ref('')
//是否存在md文件
let isMd = ref<boolean>(false)
//md文件类型
let MdType = ref<[]>([])

// onMounted(() => getResource())
onMounted(() => getMdType())

//获取html页面
// const getResource = async () => {
//   let options = {
//     fullscreen: true
//   }
//   const loadingInstance = ElLoading.service(options)
//   let title = data[0].title
//   let result = await requestHtml(title)
//   content.value = result.data
//   nextTick(() => {
//     loadingInstance.close()
//   })
// }

//获取md文件
const selectMd = async (title) => {
  let options = {
    fullscreen: true
  }
  const loadingInstance = ElLoading.service(options)
  try {
    let result = await requestMd(title)
    mdText.value = result.data
    isMd.value = true
  } catch (error) {
    ElMessage({
      message: '获取不到数据',
      type: 'warning',
      plain: true,
    })
  } finally {
    nextTick(() => {
      loadingInstance.close()
    })
  }
}

//获取md文件类型
const getMdType = () => {
  const uniqueTypes = new Set();
  data.forEach(item => {
    uniqueTypes.add(item.type);
  });
  // 将 Set 转换为 Array
  MdType.value = Array.from(uniqueTypes);
  console.log(MdType.value);
}

//获取子组件的值并设置isMd
const goBack = (val) => {
  isMd.value = val
}

</script>

<style lang="scss" scoped>
.content {
  margin: 0 auto;
}

.mdEditor {
  width: 100%;
  height: $base-main-height;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .card {
    width: 280px;
    height: 200px;
    margin: 0 40px;
    background-color: rgba(255, 255, 255, 0.7);

    .type {
      font-size: large;
      font-weight: bold;
    }

    .title {
      height: 30px;
      line-height: 30px;

      &:hover {
        cursor: pointer;
        color: $base-text-color3;
        font-size: large;
      }
    }
  }
}

.menu {
  position: fixed;
  z-index: 99;
  left: 20px;
  bottom: 100px;
  top: 150px;
  width: 150px;
  height: 200px;
  background-color: gray;
}

.navigationBar {
  position: fixed;
  z-index: 99;
  right: 20px;
  bottom: 100px;
  width: 150px;
  height: 200px;
  background-color: $base-main-bg-color;
  border-radius: 10px;

  .navigationBar-content {
    height: 100%;
    width: 100%;
    background-color: $base-tabbar-background-color;
  }
}
</style>
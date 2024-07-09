<template>
  <h1>layout</h1>
  <div v-for="img in list" :key="img.id">
    <img :src="img.src" style="height: 250px;" alt="">
  </div>
  <h4>{{ list }}</h4>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { reqPicture } from '../api/test';
import { onMounted } from 'vue'

let list = ref<[]>([])
onMounted(() => {
  getPicture()
})

const getPicture = async () => {
  let result = await reqPicture()
  if (result.code === 200) {
    list.value = result.data
    console.log(list);
  }
}

</script>

<style lang="scss" scoped></style>
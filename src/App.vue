<script setup lang="ts">
import {onMounted} from 'vue'
import {reqLogin} from './api/user'
onMounted(async () => {
  let data = {
    username: 'admin',
    password: '111111'
  }
  let req = await reqLogin(data)
  console.log(req);
})
</script>

<template>
  <div>
    <h1>test</h1>
    <img src="@/assets/img/vue3build/1-1createProject.png" alt="" style="width: 400px;" />
    <div>
      <svg-icon name="phone"></svg-icon>
    </div>
  </div>
</template>

<style scoped></style>

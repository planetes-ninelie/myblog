<template>
  <h1>home</h1>
</template>

<script setup lang="ts">
import { reqLogin } from '../../api/user';
console.log(reqLogin({username:'admin',password:'111111'}));

</script>

<style lang="scss" scoped></style>
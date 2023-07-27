<template>
  <Header />
  <div class="wrapper">
    <canvas width="200" height="200" id="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import Header from "./components/Header.vue";

onMounted(() => {
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')
  ctx.fillRect(0, 0, canvas.width, canvas.height)
})
</script>

<style scoped>

</style>

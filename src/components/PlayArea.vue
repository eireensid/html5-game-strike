<template>
  <div class="wrapper">
<!--    <canvas id="canvas" class="canvas"></canvas>-->
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";

onMounted(() => {
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')
  ctx.fillRect(0, 0, canvas.width, canvas.height)
})

</script>

<style scoped>
.wrapper {
  background-image: url('@/assets/img/matrix.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: inherit;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.canvas {
  width: 80%;
  height: 80%;
}
</style>
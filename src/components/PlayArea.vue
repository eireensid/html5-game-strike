<template>
  <div class="wrapper">
    <canvas v-show="!isModalShow" id="canvas" class="canvas" @mousemove="player.move(ctx, canvas, pic, $event)"></canvas>
    <img id="source" src="@/assets/img/wbc2.png" style="display: none;"
    />
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {isModalShow} from "@/composables/globalVars";
import Player from "@/model/Player";

const canvas = ref(null);
const ctx = ref(null);
const x = ref(130);
const pic = ref(null)
const player = ref(null)

onMounted(() => {
  canvas.value = document.querySelector('#canvas')
  ctx.value = canvas.value.getContext('2d')
  ctx.value.fillStyle = "#070F20"
  ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
  pic.value = document.querySelector('#source')
  player.value = new Player(ctx.value, pic.value, 130, 100, 30, 40)
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
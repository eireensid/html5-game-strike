<template>
  <div class="wrapper">
    <canvas v-show="!isModalShow" id="canvas" class="canvas" @mousemove="player.move(canvas, ctx, pic, $event)"></canvas>
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
const pic = ref(null)
const player = ref(null)

onMounted(() => {
  canvas.value = document.querySelector('#canvas')
  canvas.value.height = window.innerHeight * 0.8;
  canvas.value.width = window.innerWidth * 0.8;
  ctx.value = canvas.value.getContext('2d')
  ctx.value.fillStyle = "#070F20"
  ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
  pic.value = document.querySelector('#source')
  player.value = new Player(ctx.value, pic.value,
      canvas.value.width / 2 - Player.width / 2,
      canvas.value.height - Player.height - 20
  )
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
  padding-top: 80px;
}
</style>
<template>
  <div class="wrapper">
    <canvas v-show="!isModalShow" id="canvas" class="canvas" @mousemove="player.move(canvas, ctx, playerPic, $event)"></canvas>
    <img id="player" src="@/assets/img/wbc2.png" style="display: none;"/>
    <img id="topEnemy" src="@/assets/img/virus1.png" style="display: none;"/>
    <img id="middleEnemy" src="@/assets/img/virus2.png" style="display: none;"/>
    <img id="bottomEnemy" src="@/assets/img/virus3.png" style="display: none;"/>
    <div class="controls">
      <button class="fire-btn"></button>
      <button class="left-btn"></button>
      <button class="right-btn"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {isModalShow} from "@/composables/globalVars";
import Player from "@/model/Player";
import {BottomEnemy} from "@/model/Enemy";

const canvas = ref(null);
const ctx = ref(null);
const playerPic = ref(null)
const player = ref(null)
const bottomEnemyPic = ref(null)
const bottomEnemy = ref(null)

onMounted(() => {
  canvas.value = document.querySelector('#canvas')
  canvas.value.height = window.innerHeight * 0.8;
  canvas.value.width = window.innerWidth * 0.8;
  ctx.value = canvas.value.getContext('2d')
  ctx.value.fillStyle = "#070F20"
  ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
  playerPic.value = document.querySelector('#player')
  player.value = new Player(ctx.value, playerPic.value,
      canvas.value.width / 2 - Player.width / 2,
      canvas.value.height - Player.height - 20
  )

  bottomEnemyPic.value = document.querySelector('#bottomEnemy')
  bottomEnemy.value = new BottomEnemy(ctx.value, bottomEnemyPic.value,
      20, 300
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
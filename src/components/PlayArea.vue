<template>
  <div class="wrapper">
    <canvas v-show="!isModalShow" id="canvas" class="canvas"></canvas>
    <img id="player" src="@/assets/img/wbc2.png" style="display: none;"/>
    <img id="weapon" src="@/assets/img/potion.png" style="display: none;"/>
    <img id="topEnemy" src="@/assets/img/virus1.png" style="display: none;"/>
    <img id="middleEnemy" src="@/assets/img/virus2.png" style="display: none;"/>
    <img id="bottomEnemy" src="@/assets/img/virus3.png" style="display: none;"/>
    <div class="controls" v-show="!isModalShow">
      <button class="btn fire-btn" @click="player.fire">[f]ire</button>
      <button class="btn" @click="player.goLeft">
        <LeftIcon class="icon"/>
      </button>
      <button class="btn" @click="player.goRight">
        <RightIcon class="icon"/>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import LeftIcon from "@/assets/icons/left-long-solid.svg"
import RightIcon from "@/assets/icons/right-long-solid.svg"
import {onMounted, ref} from "vue";
import {
  isModalShow, player, canvas, ctx, playerPic, bottomEnemy, bottomEnemyPic,
  weapon, weaponPic
} from "@/composables/initialState";
import Player from "@/model/Player";
import {BottomEnemy} from "@/model/Enemy";

onMounted(() => {
  canvas.value = document.querySelector('#canvas')
  canvas.value.height = window.innerHeight * 0.75;
  canvas.value.width = window.innerWidth * 0.8;
  ctx.value = canvas.value.getContext('2d')
  ctx.value.fillStyle = "#070F20"
  ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
  playerPic.value = document.querySelector('#player')
  player.value = new Player(
    canvas.value.width / 2 - Player.width / 2,
    canvas.value.height - Player.height - 20
  )

  bottomEnemyPic.value = document.querySelector('#bottomEnemy')
  bottomEnemy.value = new BottomEnemy(20, 300)

  weaponPic.value = document.querySelector('#weapon')

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
  padding-top: 20px;
}
.controls {
  position: fixed;
  display: flex;
  align-items: center;
  gap: 12px;
  bottom: 5%;
}
.icon {
  width: 28px;
  fill: var(--text-color)
}
.fire-btn {
  padding: 14px 8px;
}
</style>
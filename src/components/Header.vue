<template>
  <div class="header">
    <div class="column">
      <button class="btn btn-new" @click="newGame.restart">NEW</button>
      <span class="score">0</span>
    </div>
    <h1 class="title">Critical Space Strike</h1>
    <div class="column column-right">
      <button class="btn btn-icon" @click="newGame.stop">
        <PauseIcon class="icon"/>
      </button>
      <button class="btn btn-icon" @click="newGame.start">
        <PlayIcon class="icon icon-start"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import PauseIcon from "@/assets/icons/circle-pause-regular.svg"
import PlayIcon from "@/assets/icons/circle-play-regular.svg"
import {newGame} from "@/composables/initialState"
</script>

<style scoped>
.header {
  background: var(--main-color);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  color: var(--text-color);
}
.column {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-basis: 33.3%;
}
.column-right {
  gap: 8px;
  justify-content: flex-end;
}
.title {
  font-weight: 300;
  font-size: 36px;
}
.score {
  font-size: 28px;
}
.btn-new {
  font-size: 20px;
}
.btn-icon {
  padding: 4px;
}
.icon {
  fill: var(--text-color);
  width: 28px;
}
.icon-start {
  fill: var(--accent-color);
}
</style>
<template>
  <div class="header">
    <div class="column">
      <button class="btn btn-new" @click="play">NEW</button>
      <div class="hearts">
        <HeartIcon v-for="xp in newGame.xp.value" :key="xp" class="icon icon-heart" />
      </div>
      <span class="score">{{newGame.score}}</span>
    </div>
    <h1 class="title">Critical Space Strike</h1>
    <div class="column column-right">
      <button class="btn btn-icon" :class="{'btn-disabled': isPaused}" @click="pause">
        <PauseIcon class="icon" :class="{'icon-active': isPaused}"/>
      </button>
      <button class="btn btn-icon" :class="{'btn-disabled': !isPaused}" @click="resume">
        <PlayIcon class="icon" :class="{'icon-active': !isPaused}"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import PauseIcon from "@/assets/icons/circle-pause-regular.svg"
import PlayIcon from "@/assets/icons/circle-play-regular.svg"
import HeartIcon from "@/assets/icons/heart-solid.svg"
import {newGame, modal, isModalShow} from "@/composables/initialState"
import {ref} from "vue";

const isPaused = ref(false)

const play = () => {
  isPaused.value = false
  if (isModalShow.value === true) {
    isModalShow.value = modal.close()
  }
  newGame.start()
}

const pause = () => {
  newGame.stop()
  isPaused.value = true
}

const resume = () => {
  newGame.resume()
  isPaused.value = false
}

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
  gap: 26px;
  flex-basis: 33.3%;
}
.column-right {
  gap: 8px;
  justify-content: flex-end;
}
.title {
  font-weight: 300;
  font-size: 40px;
  text-align: center;
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
  fill: var(--accent-color);
  width: 28px;
}
.icon-active {
  fill: var(--text-color);
}
.hearts {
  display: flex;
  align-items: center;
  gap: 4px;
}
.icon-heart {
  fill: #E53935;
}
</style>
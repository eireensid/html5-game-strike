<template>
  <div class="header">
    <div class="column">
      <button class="btn btn-new">NEW</button>
      <span class="score">0</span>
    </div>
    <h1 class="title">Critical Space Strike</h1>
    <div class="column column-right">
      <button class="btn btn-icon">
        <PauseIcon class="icon"/>
      </button>
      <button class="btn btn-icon">
        <PlayIcon class="icon icon-start"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import PauseIcon from "../assets/icons/circle-pause-regular.svg"
import PlayIcon from "../assets/icons/circle-play-regular.svg"
</script>

<style scoped>
.header {
  background: #070F20;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  color: #fff;
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
}
.score {
  font-weight: 400;
  font-size: 28px;
}
.btn {
  padding: 8px;
  color: #fff;
  border-radius: 8px;
  border: 3px solid #0C693B;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .25s;
}
.btn:hover {
  opacity: .7;
}
.btn-new {
  font-weight: 400;
  font-size: 20px;
}
.btn-icon {
  padding: 4px;
}
.icon {
  fill: #fff;
  width: 28px;
}
.icon-start {
  fill: #0C693B;
}
</style>
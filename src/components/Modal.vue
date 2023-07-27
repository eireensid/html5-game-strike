<template>
  <div class="modal" v-show="isShow">
    <h2 class="title">Welcome to the game!</h2>
    <button class="btn btn-modal">PLAY!</button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const isShow = ref(true)
</script>

<style scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 80%;
  background: var(--main-color);
  z-index: 100;
  top: 58px;
  left: 0;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
}
.title {
  font-weight: 300;
  margin-top: -58px;
  font-size: 30px;
}
.btn-modal {
  font-size: 30px;
}
</style>
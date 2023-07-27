<template>
  <Header />
  <PlayArea />
  <Modal />
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import PlayArea from "./components/PlayArea.vue";
import Modal from "@/components/Modal.vue";
import Game from "@/model/Game";

const newGame = new Game()
newGame.start()

</script>


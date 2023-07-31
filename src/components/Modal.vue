<template>
	<div class="modal" v-show="isModalShow">
		<div v-if="isWinShow">
			<h2 class="win">YOU W0N!</h2>
		</div>
		<div class="block" v-else>
			<h2 class="title">Welcome to the game!</h2>
			<button class="btn btn-modal" @click="play">PLAY!</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { newGame, modal, isModalShow, isWinShow } from '@/composables/initialState'

const play = () => {
	newGame.start()
	setTimeout(() => {
		isModalShow.value = modal.close()
	}, 50)
}
</script>

<style scoped>
.modal {
	position: fixed;
	width: 100%;
	height: 80%;
	background: var(--main-color);
	z-index: 100;
	top: 68px;
	left: 0;
	color: var(--text-color);
	display: flex;
	align-items: center;
	justify-content: center;
}
.block {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 30px;
}
.title {
	font-weight: 300;
	margin-top: -50px;
	font-size: 40px;
}
.win {
	font-weight: 700;
	margin-top: -40px;
	font-size: 60px;
	color: var(--accent-color);
}
.btn-modal {
	font-size: 30px;
}
@media screen and (max-width: 767px) {
	.title {
		font-size: 26px;
	}
	.btn-modal {
		font-size: 26px;
	}
}
@media screen and (min-width: 530px) and (max-width: 767px) {
	.modal {
		top: 50px;
	}
}
@media screen and (min-width: 768px) and (max-width: 820px) {
	.modal {
		top: 70px;
	}
}
</style>

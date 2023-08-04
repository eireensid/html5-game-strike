<template>
	<div class="header">
		<div class="row row-top">
			<div class="column">
				<button class="btn btn-new" @click="play">NEW</button>
				<div class="hearts">
					<HeartFilledIcon v-for="xp in newGame.xp.value" :key="xp" class="icon icon-heart" />
					<HeartStrokeIcon v-for="xp in totalHearts - newGame.xp.value" :key="xp" class="icon icon-heart" />
				</div>
				<span class="score">{{ newGame.score }}</span>
			</div>
			<h1 class="title">Critical Space Strike</h1>
			<div class="column column-right">
				<button class="btn btn-icon" :class="{ 'btn-disabled': isPaused }" @click="pause">
					<PauseIcon class="icon" :class="{ 'icon-active': isPaused }" />
				</button>
				<button class="btn btn-icon" :class="{ 'btn-disabled': !isPaused }" @click="resume">
					<PlayIcon class="icon" :class="{ 'icon-active': !isPaused }" />
				</button>
			</div>
		</div>
		<div class="row row-bottom">
			<span class="score score-mobile">{{ newGame.score }}</span>
			<div class="hearts hearts-mobile">
				<HeartFilledIcon v-for="xp in newGame.xp.value" :key="xp" class="icon icon-heart" />
				<HeartStrokeIcon v-for="xp in totalHearts - newGame.xp.value" :key="xp" class="icon icon-heart" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import PauseIcon from '@/assets/icons/circle-pause-regular.svg'
import PlayIcon from '@/assets/icons/circle-play-regular.svg'
import HeartFilledIcon from '@/assets/icons/heart-solid.svg'
import HeartStrokeIcon from '@/assets/icons/heart-regular.svg'
import { newGame, modal, isModalShow } from '@/composables/initialState'
import { ref } from 'vue'

const isPaused = ref(false)
const totalHearts = newGame.xp.value

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
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	color: var(--text-color);
}
.row {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.row-top {
	background: var(--main-color);
	padding: 16px;
}
.row-bottom {
	display: none;
	padding: 8px;
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
	font-size: 46px;
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
	fill: #e53935;
}
@media screen and (max-width: 767px) {
	.row-top {
		padding: 8px;
	}
	.btn-new {
		font-size: 16px;
	}
}
@media screen and (max-width: 820px) {
	.hearts,
	.score {
		display: none;
	}
	.hearts-mobile {
		display: flex;
	}
	.score-mobile {
		display: block;
	}
	.row-bottom {
		display: flex;
	}
	.title {
		font-size: 26px;
	}
}
@media screen and (min-width: 821px) and (max-width: 1200px) {
	.title {
		font-size: 40px;
	}
}
</style>

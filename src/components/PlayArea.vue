<template>
	<div class="wrapper">
		<canvas v-show="!isModalShow" id="canvas" ref="canvas" class="canvas"></canvas>
		<img id="player" src="@/assets/img/wbc2.png" style="display: none" />
		<img id="bullet" src="@/assets/img/potion.png" style="display: none" />
		<img id="topEnemy" src="@/assets/img/virus1.png" style="display: none" />
		<img id="middleEnemy" src="@/assets/img/virus2.png" style="display: none" />
		<img id="bottomEnemy" src="@/assets/img/virus3.png" style="display: none" />
		<div class="controls" v-show="!isModalShow">
			<button class="btn fire-btn" @click="debouncedFire">[f]ire</button>
			<button class="btn" @click="newGame.makeAction('goLeft')">
				<LeftIcon class="icon" />
			</button>
			<button class="btn" @click="newGame.makeAction('goRight')">
				<RightIcon class="icon" />
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import LeftIcon from '@/assets/icons/left-long-solid.svg'
import RightIcon from '@/assets/icons/right-long-solid.svg'
import { isModalShow } from '@/composables/initialState'
import { newGame } from '@/composables/initialState'
import { debounce } from '@/composables/helpers'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvas = ref(null)

const debouncedFire = debounce(() => newGame.makeAction('fire'))

function onKeyDown(e) {
	e.preventDefault()
	if (e.keyCode === 39) {
		newGame.makeAction('goRight')
	} else if (e.keyCode === 37) {
		newGame.makeAction('goLeft')
	} else if (e.keyCode === 32) {
		// enter
		debouncedFire()
	}
}
document.addEventListener('keydown', onKeyDown)

const onResize = () => {
	if (window.innerWidth < 768) {
		canvas.value.width = window.innerWidth * 0.95
		canvas.value.height = window.innerHeight * 0.4
	} else if (window.innerWidth >= 768 && window.innerWidth < 960) {
		canvas.value.width = window.innerWidth * 0.95
		canvas.value.height = window.innerHeight * 0.5
	} else {
		canvas.value.width = window.innerWidth * 0.8
		canvas.value.height = window.innerHeight * 0.75
	}
}

onMounted(() => {
	onResize()
	window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
	document.removeEventListener('keydown', onKeyDown)
	window.removeEventListener('resize', onResize)
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
	fill: var(--text-color);
}
.fire-btn {
	padding: 14px 8px;
}
@media screen and (max-width: 820px) {
	.wrapper {
		padding-top: 46px;
	}
}
</style>

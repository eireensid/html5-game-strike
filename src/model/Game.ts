import Player from '@/model/Player'
import { canvas, ctx, modal, isModalShow, isWinShow, newGame } from '@/composables/initialState'
import { Enemy } from '@/model/Enemy'
import Bullet from '@/model/Bullet'
import { ref } from 'vue'
import GameRules from '@/model/GameRules'
import GameObjects from '@/model/GameObjects'

export default class Game {
	private intervalId
	private running = false
	private gameObjects = new GameObjects()
	score = ref(0)
	xp = ref(3)

	private initCanvas(ctx) {
		ctx.value.fillStyle = '#070F20'
		ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
	}

	private init() {
		canvas.value = document.querySelector('#canvas')
		ctx.value = canvas.value.getContext('2d')
		this.initCanvas(ctx)

		Player.width = canvas.value.width * 0.065
		Player.height = canvas.value.width * 0.065 + 10

		Bullet.width = canvas.value.width * 0.024
		Bullet.height = canvas.value.width * 0.024

		Enemy.width = canvas.value.width * 0.05
		Enemy.height = canvas.value.width * 0.05

		this.score.value = 0

		this.gameObjects.init()
	}

	private render() {
		requestAnimationFrame(() => {
			this.initCanvas(ctx)
			this.gameObjects.player.draw()

			GameRules.redrawBullets(this.gameObjects.bullets)

			GameRules.redrawEnemies(this.gameObjects.enemies)

			this.score.value += GameRules.hitEnemies(this.gameObjects)
		})

		// show win modal
		if (!this.gameObjects.enemies.length) {
			isModalShow.value = modal.open()
			isWinShow.value = true
			this.stop()

			setTimeout(() => {
				isWinShow.value = false
			}, 2000)
		}
	}

	makeAction(action: 'goLeft' | 'goRight' | 'fire') {
		if (!newGame.running) return
		if (action === 'goLeft') {
			this.gameObjects.player.goLeft()
		} else if (action === 'goRight') {
			this.gameObjects.player.goRight()
		} else if (action === 'fire') {
			this.gameObjects.createBullet()
		}
	}

	private resume() {
		this.running = true

		this.intervalId = setInterval(() => {
			this.render()
		}, 1000 / 60)
	}

	stop() {
		this.running = false
		clearInterval(this.intervalId)
	}

	start() {
		this.stop()
		this.init()
		this.resume()
	}
}

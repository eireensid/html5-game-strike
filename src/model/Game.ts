import Player from '@/model/Player'
import { canvas, ctx, modal, isModalShow, newGame, isModalBtnShow, modalTextClass } from '@/composables/initialState'
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
		this.xp.value = 3

		this.gameObjects.init()
	}

	private render() {
		requestAnimationFrame(() => {
			this.initCanvas(ctx)
			this.gameObjects.player.draw()

			GameRules.redrawBullets(this.gameObjects.bullets)
			GameRules.redrawEnemies(this.gameObjects.enemies)

			this.score.value += GameRules.hitEnemies(this.gameObjects)
			this.xp.value = GameRules.hitPlayer(this.gameObjects)

			if (this.gameObjects.enemies.length > 0) {
				GameRules.redrawEnemyBullet(this.gameObjects)
			}
		})

		// show you won
		if (!this.gameObjects.enemies.length) {
			this.showEndResult('YOU W0N!', 'win')
		}

		// show you lost
		if (!this.xp.value) {
			this.showEndResult('YOU LOST!', 'loose')
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

	showEndResult(message, cl) {
		isModalShow.value = modal.open(message)
		isModalBtnShow.value = modal.toggleBtn(false)
		modalTextClass.value = cl
		this.stop()

		setTimeout(() => {
			isModalBtnShow.value = modal.toggleBtn(true)
			modal.message = 'Welcome to the game!'
			modalTextClass.value = ''
		}, 2000)
	}

	resume() {
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

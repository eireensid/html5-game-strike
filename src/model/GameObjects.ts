import Bullet from '@/model/Bullet'
import { Enemy } from '@/model/Enemy'
import { canvas } from '@/composables/initialState'
import Player from '@/model/Player'
import GameSprites from '@/model/GameSprites'
import { randomIntFromInterval } from '@/composables/helpers'

export default class GameObjects {
	private _bullets: Bullet[] = []
	private _enemies: Enemy[] = []
	private _player: Player = null
	private _enemyBullet: Bullet = null
	private _isEnemyBullet = false

	get bullets() {
		return this._bullets
	}

	get enemies() {
		return this._enemies
	}

	get player() {
		return this._player
	}

	get enemyBullet() {
		return this._enemyBullet
	}

	get isEnemyBullet() {
		return this._isEnemyBullet
	}

	init() {
		this._bullets = []
		this.generateEnemies()
		this.createPlayer()
	}

	private generateEnemies() {
		this._enemies = []

		for (let i = 0; i < 15; i++) {
			let enemy = null
			const distance = (Enemy.width * 2) / 2.5
			const arrX = [
				0,
				Enemy.width + distance,
				Enemy.width * 2 + distance * 2,
				Enemy.width * 3 + distance * 3,
				Enemy.width * 4 + distance * 4,
				canvas.value.width,
				canvas.value.width - (Enemy.width + distance),
				canvas.value.width - (Enemy.width * 2 + distance * 2),
				canvas.value.width - (Enemy.width * 3 + distance * 3),
				canvas.value.width - (Enemy.width * 4 + distance * 4),
				0,
				Enemy.width + distance,
				Enemy.width * 2 + distance * 2,
				Enemy.width * 3 + distance * 3,
				Enemy.width * 4 + distance * 4
			]
			const bottomY = canvas.value.height - (canvas.value.height - Player.height - 20 - Enemy.height * 3)
			if (i >= 0 && i < 5) {
				enemy = new Enemy(arrX[i], bottomY, 'bottom', GameSprites.bottomEnemyPic)
			}
			if (i >= 5 && i < 10) {
				enemy = new Enemy(arrX[i], (bottomY * 2) / 3, 'center', GameSprites.middleEnemyPic)
			}
			if (i >= 10 && i < 15) {
				enemy = new Enemy(arrX[i], bottomY / 3, 'top', GameSprites.topEnemyPic)
			}
			enemy.ind = i
			this._enemies.push(enemy)
		}
	}

	private createPlayer() {
		this._player = new Player(
			canvas.value.width / 2 - Player.width / 2,
			canvas.value.height - Player.height - 20,
			GameSprites.playerPic
		)
	}

	createBullet() {
		const bulletY = canvas.value.height - Player.width - Bullet.width - 40
		const bullet = new Bullet(this.player.x + Player.width / 2, bulletY, GameSprites.bulletPic)
		this.bullets.push(bullet)
	}

	removeEnemy(enemy: Enemy) {
		this._enemies = this._enemies.filter(e => e !== enemy)
	}

	removeBullet(bullet: Bullet) {
		this._bullets = this._bullets.filter(b => b !== bullet)
	}

	createEnemyBullet() {
		setTimeout(() => {
			if (!this.enemyBullet && !this.isEnemyBullet) {
				this._isEnemyBullet = true
				const random = randomIntFromInterval(0, this._enemies.length - 1)
				const randomEnemy = this.enemies[random]
				this._enemyBullet = new Bullet(randomEnemy.x, randomEnemy.y, GameSprites.bulletPic)
			}
		}, 2000)
	}

	removeEnemyBullet() {
		this._enemyBullet = null
		this._isEnemyBullet = false
	}
}

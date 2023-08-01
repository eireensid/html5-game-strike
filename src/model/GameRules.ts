import { Enemy } from '@/model/Enemy'
import Bullet from '@/model/Bullet'
import { canvas, newGame } from '@/composables/initialState'
import GameObjects from '@/model/GameObjects'
import Player from '@/model/Player'

export default abstract class GameRules {
	private static hitHelper(obj1, obj2, class1, class2) {
		let collision = true
		if (
			obj1.x > obj2.x + class2.width ||
			obj1.y > obj2.y + class2.height ||
			obj2.x > obj1.x + class1.width ||
			obj2.y > obj1.y + class1.height
		) {
			collision = false
		}
		return collision
	}

	static redrawBullets(bullets: Bullet[]) {
		// remove bullet from array if out of play field
		bullets.forEach((bullet, ind, obj) => {
			if (bullet.y < 0) {
				obj.splice(ind, 1)
			}
		})

		bullets.forEach(bullet => {
			if (bullet) {
				bullet.update('top')
				bullet.draw()
			}
		})
	}

	static redrawEnemies(enemies: Enemy[]) {
		// enemies change direction
		enemies.forEach(enemy => {
			if (enemy) {
				const groupEnemies = enemies.filter(e => e.group === enemy.group)
				if (enemy.x < 0) {
					for (let groupEnemy of groupEnemies) {
						groupEnemy.direction = 'right'
					}
				} else if (enemy.x + Enemy.width > canvas.value.width) {
					for (let groupEnemy of groupEnemies) {
						groupEnemy.direction = 'left'
					}
				}
			}
		})

		enemies.forEach(enemy => {
			if (enemy) {
				enemy.update()
				enemy.draw(enemy.x, enemy.y)
			}
		})
	}

	static hitPlayer(gameObjects: GameObjects): number {
		const { player, enemyBullet } = gameObjects
		let xp = newGame.xp.value
		let collision = null
		if (enemyBullet) {
			collision = this.hitHelper(enemyBullet, player, Bullet, Player)
		}

		if (collision) {
			//delete enemy bullet, decrease xp
			gameObjects.removeEnemyBullet()
			xp -= 1
		}

		return xp
	}

	static hitEnemies(gameObjects: GameObjects): number {
		// bullet hit enemy
		let score = 0

		const { enemies, bullets } = gameObjects

		enemies.forEach(enemy => {
			bullets.forEach(bullet => {
				let collision = this.hitHelper(bullet, enemy, Bullet, Enemy)
				if (collision) {
					// delete bullet and enemy
					gameObjects.removeEnemy(enemy)
					gameObjects.removeBullet(bullet)

					// increase score
					if (enemy.group === 'bottom') {
						score += 100
					} else if (enemy.group === 'center') {
						score += 200
					} else {
						score += 300
					}
				}
			})
		})

		return score
	}

	static redrawEnemyBullet(gameObjects: GameObjects) {
		gameObjects.createEnemyBullet()

		if (gameObjects.enemyBullet && gameObjects.isEnemyBullet) {
			gameObjects.enemyBullet.update('bottom')
			gameObjects.enemyBullet.draw()
		}

		if (gameObjects.enemyBullet && gameObjects.enemyBullet.y > canvas.value.height) {
			gameObjects.removeEnemyBullet()
		}
	}
}

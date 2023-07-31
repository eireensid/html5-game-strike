import { Enemy } from '@/model/Enemy'
import Bullet from '@/model/Bullet'
import { canvas } from '@/composables/initialState'
import GameObjects from '@/model/GameObjects'

export default abstract class GameRules {
	static hitEnemy(item1, item2) {
		let collision = true
		if (
			item1.x > item2.x + Enemy.width ||
			item1.y > item2.y + Enemy.height ||
			item2.x > item1.x + Bullet.width ||
			item2.y > item1.y + Bullet.height
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
				bullet.update()
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

	static hitEnemies(gameObjects: GameObjects): number {
		// bullet hit enemy
		let score = 0

		const { enemies, bullets } = gameObjects

		enemies.forEach(enemy => {
			bullets.forEach(bullet => {
				let collision = GameRules.hitEnemy(bullet, enemy)
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
}

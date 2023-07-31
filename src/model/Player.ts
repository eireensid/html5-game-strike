import { newGame, canvas, ctx } from '@/composables/initialState'
import { bullets } from '@/model/Game'
import Bullet from '@/model/Bullet'

export default class Player {
	static width = 80
	static height = 90
	step = 40
	x = 0
	pic = null
	bulletPic = null

	constructor(x, y, pic, bulletPic) {
		pic.onload = function () {
			ctx.value.drawImage(pic, x, y, Player.width, Player.height)
		}

		this.x = x
		this.pic = pic
		this.bulletPic = bulletPic
	}

	draw(x, y) {
		ctx.value.drawImage(this.pic, x, y, Player.width, Player.height)
	}

	goLeft() {
		if (!newGame.running) return

		if (this.x > this.step) {
			this.x -= this.step
		}
	}

	goRight() {
		if (!newGame.running) return

		if (this.x < canvas.value.width - Player.width - this.step) {
			this.x += this.step
		}
	}

	fire() {
		if (!newGame.running) return

		const bulletY = canvas.value.height - Player.width - Bullet.width - 40
		const bullet = new Bullet(this.x + Player.width / 2, bulletY, this.bulletPic)
		bullets.push(bullet)
	}
}

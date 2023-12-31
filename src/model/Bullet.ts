import { ctx } from '@/composables/initialState'
import { RectangleBounds } from './types'

export default class Bullet {
	static width = 30
	static height = 30
	step = 3
	x = 0
	y = 0
	pic = null

	constructor(x, y, pic) {
		pic.onload = function () {
			ctx.value.drawImage(pic, x, y, Bullet.width, Bullet.height)
		}

		this.y = y
		this.x = x
		this.pic = pic
	}

	draw() {
		ctx.value.drawImage(this.pic, this.x, this.y, Bullet.width, Bullet.height)
	}

	update(direction: 'top' | 'bottom') {
		if (direction === 'top') {
			this.y -= this.step
		} else {
			this.y += this.step
		}
	}

	toRectangleBounds(): RectangleBounds {
		return {
			x: this.x,
			y: this.y,
			height: Bullet.height,
			width: Bullet.width
		}
	}
}

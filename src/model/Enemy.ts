import { ctx } from '@/composables/initialState'
import { RectangleBounds } from './types'

export class Enemy {
	static width = 60
	static height = 60
	direction: 'left' | 'right' = 'left'
	group: 'top' | 'center' | 'bottom'
	step = 2
	x = 0
	y = 0
	pic = null

	constructor(x, y, group, pic) {
		pic.onload = function () {
			ctx.value.drawImage(pic, x, y, Enemy.width, Enemy.height)
		}

		this.x = x
		this.y = y
		this.pic = pic
		this.group = group

		if (group === 'top' || group === 'bottom') {
			this.direction = 'right'
		}
	}

	draw(x, y) {
		ctx.value.drawImage(this.pic, x, y, Enemy.width, Enemy.height)
	}

	update() {
		if (this.direction === 'right') {
			this.x += this.step
		} else {
			this.x -= this.step
		}
	}

	toRectangleBounds(): RectangleBounds {
		return {
			x: this.x,
			y: this.y,
			height: Enemy.height,
			width: Enemy.width
		}
	}
}

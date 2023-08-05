import { canvas, ctx } from '@/composables/initialState'
import { RectangleBounds } from './types'

export default class Player {
	static width = 80
	static height = 90
	step = 40
	x = 0
	y = 0
	pic = null

	constructor(x: number, y: number, pic: HTMLImageElement) {
		pic.onload = function () {
			ctx.value.drawImage(pic, x, y, Player.width, Player.height)
		}

		this.x = x
		this.y = y
		this.pic = pic
	}

	draw() {
		ctx.value.drawImage(this.pic, this.x, this.y, Player.width, Player.height)
	}

	goLeft() {
		if (this.x > this.step) {
			this.x -= this.step
		}
	}

	goRight() {
		if (this.x < canvas.value.width - Player.width - this.step) {
			this.x += this.step
		}
	}

	toRectangleBounds(): RectangleBounds {
		return {
			x: this.x,
			y: this.y,
			height: Player.height,
			width: Player.width
		}
	}
}

import { canvas, ctx } from '@/composables/initialState'

export default class Player {
	static width = 80
	static height = 90
	step = 40
	x = 0
	pic = null

	constructor(x: number, y: number, pic: HTMLImageElement) {
		pic.onload = function () {
			ctx.value.drawImage(pic, x, y, Player.width, Player.height)
		}

		this.x = x
		this.pic = pic
	}

	draw() {
		ctx.value.drawImage(this.pic, this.x, canvas.value.height - Player.height - 20, Player.width, Player.height)
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
}

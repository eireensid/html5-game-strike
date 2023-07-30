import {ctx} from "@/composables/initialState";

export default class Bullet {
  static width = 30
  static height = 30
  step = 3
  x = 0
  y = 0
  pic = null

  constructor(x, y, pic) {
    pic.onload = function() {
      ctx.value.drawImage(pic, x, y, Bullet.width, Bullet.height)
    }

    this.y = y
    this.x = x
    this.pic = pic
  }

  draw(x, y) {
    ctx.value.drawImage(this.pic, x, y, Bullet.width, Bullet.height)
  }

  update() {
    this.y -= this.step
  }
}
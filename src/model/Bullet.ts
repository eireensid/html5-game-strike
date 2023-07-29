import {ctx, bulletPic, canvas} from "@/composables/initialState";

export default class Bullet {
  static width = 30
  static height = 30
  step = 3

  constructor(x, y) {
    bulletPic.value.onload = function() {
      ctx.value.drawImage(bulletPic.value, x, y, Bullet.width, Bullet.height)
    }

    this.y = y
    this.x = x
  }

  draw(x, y) {
    ctx.value.drawImage(bulletPic.value, x, y, Bullet.width, Bullet.height)
  }

  update() {
    this.y -= this.step
  }
}
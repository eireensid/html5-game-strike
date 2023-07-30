import {ctx} from "@/composables/initialState";

export class Enemy {
  static width = 60
  static height = 60
  direction: 'left' | 'right' = 'left'
  group: 'top' | 'center' | 'bottom'
  step = 1

  constructor(x, y, group, picRef) {
    picRef.onload = function() {
      ctx.value.drawImage(picRef, x, y, Enemy.width, Enemy.height)
    }

    this.x = x
    this.y = y
    this.picRef = picRef
    this.group = group

    if (group === 'top' || group === 'bottom') {
      this.direction = 'right'
    }
  }

  draw(x, y) {
    ctx.value.drawImage(this.picRef, x, y, Enemy.width, Enemy.height)
  }

  update() {
    if (this.direction === 'right') {
      this.x += this.step
    } else {
      this.x -= this.step
    }
  }
}
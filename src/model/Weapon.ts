import {ctx, weaponPic, canvas} from "@/composables/initialState";

export default class Weapon {
  static width = 30
  static height = 30
  step = 3
  active = true

  constructor(x, y) {
    weaponPic.value.onload = function() {
      ctx.value.drawImage(weaponPic.value, x, y, Weapon.width, Weapon.height)
    }

    this.y = y
  }

  draw(x, y) {
    ctx.value.drawImage(weaponPic.value, x, y, Weapon.width, Weapon.height)
  }

  update() {
    this.y -= this.step
  }
}
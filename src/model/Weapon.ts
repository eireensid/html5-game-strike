import {ctx, weaponPic} from "@/composables/initialState";

export default class Weapon {
  static width = 30
  static height = 30

  constructor(x, y) {
    weaponPic.value.onload = function() {
      ctx.value.drawImage(weaponPic.value, x, y, Weapon.width, Weapon.height)
    }
  }

  draw(x, y) {
    ctx.value.drawImage(weaponPic.value, x, y, Weapon.width, Weapon.height)
  }
}
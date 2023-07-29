import {newGame, canvas, ctx, playerPic, weapon} from "@/composables/initialState";
import Weapon from "@/model/Weapon";

export default class Player {
  score = 0
  static width = 80
  static height = 90
  step = 40

  constructor(x, y) {

    playerPic.value.onload = function() {
      ctx.value.drawImage(playerPic.value, x, y, Player.width, Player.height)
    }

    this.x = x
  }

  draw(x, y) {
    ctx.value.drawImage(playerPic.value, x, y, Player.width, Player.height)
  }

  goLeft() {
    if (!newGame.running) return

    if (this.x > this.step) {
      this.x -= this.step;
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

    weapon.value = new Weapon(canvas.value.width / 2 - Weapon.width / 2, 400)
  }
}
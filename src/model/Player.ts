import {newGame, canvas, ctx, playerPic, bullet, bullets} from "@/composables/initialState";
import Bullet from "@/model/Bullet";

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

    bullet.value = new Bullet(this.x + Player.width / 2, 400)
    bullets.push(bullet.value)
  }
}
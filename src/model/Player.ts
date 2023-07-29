import {newGame, canvas, ctx, playerPic} from "@/composables/initialState";

export default class Player {
  score = 0
  static width = 80
  static height = 90
  step = 40

  constructor(x, y) {
    if (Player._instance) {
      throw new Error("Singleton classes can't be instantiated more than once.")
    }
    Player._instance = this;

    playerPic.value.onload = function() {
      ctx.value.drawImage(playerPic.value, x, y, Player.width, Player.height)
    }

    this.x = x
  }

  draw(x, y) {
    ctx.value.drawImage(playerPic.value, x, y, Player.width, Player.height)
  }

  goLeft() {
    if (this.x > this.step) {
      this.x -= this.step;
    }

    newGame.render()
  }

  goRight() {
    if (this.x < canvas.value.width - Player.width - this.step) {
      this.x += this.step
    }

    newGame.render()
  }
}
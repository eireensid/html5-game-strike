import {newGame} from "@/composables/globalVars";

export default class Player {
  score = 0
  static width = 60
  static height = 70
  step = 40

  constructor(ctx, pic, x, y) {
    if (Player._instance) {
      throw new Error("Singleton classes can't be instantiated more than once.")
    }
    Player._instance = this;

    pic.onload = function() {
      ctx.drawImage(pic, x, y, Player.width, Player.height)
    }

    this.x = x
  }

  draw(ctx, pic, x, y, width, height) {
    ctx.drawImage(pic, x, y, width, height)
  }

  goLeft(canvas, ctx, pic) {
    if (this.x > this.step) {
      this.x -= this.step;
    }

    newGame.render(canvas, ctx, pic)
  }

  goRight(canvas, ctx, pic) {
    if (this.x < canvas.width - Player.width - this.step) {
      this.x += this.step
    }

    newGame.render(canvas, ctx, pic)
  }
}
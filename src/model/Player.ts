import {ref} from "vue";

export default class Player {
  score: number = 0
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

  move(canvas, ctx, pic, e) {
    const x = e.pageX
    if (Player.width / 2 + 20 < x && x < canvas.width - Player.width / 2 - 20) {
      this.x = x - Player.width / 2;
    }
    requestAnimationFrame(() => {
      ctx.fillStyle = "#070F20"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      this.draw(ctx, pic, this.x, canvas.height - Player.height - 20, Player.width, Player.height)
    })
    // console.log('x', x.value)
  }

  goLeft(canvas, ctx, pic) {
    // if (gameStarted) {
    //   if (xPos < 0)
    //     xPos = 0;
    //   else if (xPos > stage.width - ship.width)
    //     xPos = stage.width - ship.width;
    // }
    if (this.x > this.step) {
      this.x -= this.step;
    }

    requestAnimationFrame(() => {
      ctx.fillStyle = "#070F20"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      this.draw(ctx, pic, this.x, canvas.height - Player.height - 20, Player.width, Player.height)
    })
  }

  goRight(canvas, ctx, pic) {
    if (this.x < canvas.width - Player.width - this.step) {
      this.x += this.step
    }

    requestAnimationFrame(() => {
      ctx.fillStyle = "#070F20"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      this.draw(ctx, pic, this.x, canvas.height - Player.height - 20, Player.width, Player.height)
    })
  }
}
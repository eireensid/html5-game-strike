import {ref} from "vue";

export default class Player {
  score: number = 0
  static width = 30
  static height = 40

  constructor(ctx, pic, x, y) {
    pic.onload = function() {
      ctx.drawImage(pic, x, y, Player.width, Player.height)
    }

    this.x = x
  }

  draw(ctx, pic, x, y, width, height) {
    ctx.drawImage(pic, x, y, width, height)
  }

  move(canvas, ctx, pic, e) {
    const x = ref(e.pageX)
    if (Player.width / 2 + 20 < x.value && x.value < canvas.width - Player.width / 2 - 20) {
      this.x = x.value - Player.width / 2;
    }
    requestAnimationFrame(() => {
      ctx.fillStyle = "#070F20"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      this.draw(ctx, pic, this.x, canvas.height - Player.height - 20, Player.width, Player.height)
    })
    console.log('x', x.value)
  }
}
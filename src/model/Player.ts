import {ref} from "vue";

export default class Player {
  score: number = 0

  constructor(ctx, pic, x, y, width, height) {
    pic.onload = function() {
      ctx.drawImage(pic, x, y, width, height)
    }
  }

  draw(ctx, pic, x, y, width, height) {
    ctx.drawImage(pic, x, y, width, height)
  }

  move(ctx, canvas, pic, e) {
    const x = ref(e.pageX)
    // if (player.width / 2 + 10 < x.value && x.value < 800 - player.width / 2 - 10) {
    //   player.x = x.value - player.width / 2;
    // }
    requestAnimationFrame(() => {
      ctx.fillStyle = "#070F20"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      this.draw(ctx, pic, x.value, 100, 30, 40)
    })
    console.log('x', x.value)
  }
}
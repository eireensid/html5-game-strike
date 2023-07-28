class Enemy {

}

export class BottomEnemy extends Enemy {
  static width = 60
  static height = 70

  constructor(ctx, pic, x, y) {
    super()
    pic.onload = function() {
      ctx.drawImage(pic, x, y, BottomEnemy.width, BottomEnemy.height)
    }
  }

  draw(ctx, pic, x, y, width, height) {
    ctx.drawImage(pic, x, y, width, height)
  }
}
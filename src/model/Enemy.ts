import {ctx, bottomEnemyPic} from "@/composables/initialState";

class Enemy {

}

export class BottomEnemy extends Enemy {
  static width = 60
  static height = 70

  constructor(x, y) {
    super()
    bottomEnemyPic.value.onload = function() {
      ctx.value.drawImage(bottomEnemyPic.value, x, y, BottomEnemy.width, BottomEnemy.height)
    }
  }

  draw(x, y) {
    ctx.value.drawImage(bottomEnemyPic.value, x, y, BottomEnemy.width, BottomEnemy.height)
  }
}
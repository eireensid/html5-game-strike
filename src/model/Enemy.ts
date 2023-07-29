import {ctx, bottomEnemyPic, middleEnemyPic, topEnemyPic} from "@/composables/initialState";

class Enemy {
  static width = 60
  static height = 60
  step = 1

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  update() {
    this.x += this.step
  }
}

export class BottomEnemy extends Enemy {
  constructor(x, y) {
    super(x, y)

    bottomEnemyPic.value.onload = function() {
      ctx.value.drawImage(bottomEnemyPic.value, x, y, Enemy.width, Enemy.height)
    }
  }

  draw(x, y) {
    ctx.value.drawImage(bottomEnemyPic.value, x, y, Enemy.width, Enemy.height)
  }
}

export class MiddleEnemy extends Enemy {
  constructor(x, y) {
    super(x, y)

    middleEnemyPic.value.onload = function() {
      ctx.value.drawImage(middleEnemyPic.value, x, y, Enemy.width, Enemy.height)
    }
  }

  draw(x, y) {
    ctx.value.drawImage(middleEnemyPic.value, x, y, Enemy.width, Enemy.height)
  }

  update() {
    this.x -= this.step
  }
}

export class TopEnemy extends Enemy {
  constructor(x, y) {
    super(x, y)

    topEnemyPic.value.onload = function() {
      ctx.value.drawImage(topEnemyPic.value, x, y, Enemy.width, Enemy.height)
    }
  }

  draw(x, y) {
    ctx.value.drawImage(topEnemyPic.value, x, y, Enemy.width, Enemy.height)
  }
}
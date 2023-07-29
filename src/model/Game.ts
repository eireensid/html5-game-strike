import Player from "@/model/Player";
import {player, canvas, ctx, playerPic, enemies, bottomEnemyPic, middleEnemyPic, topEnemyPic, bulletPic, bullets} from "@/composables/initialState";
import {BottomEnemy, MiddleEnemy, TopEnemy, Enemy} from "@/model/Enemy";

export default class Game {
  private intervalId
  private _running = false

  get running() {
    return this._running
  }

  init() {
    canvas.value = document.querySelector('#canvas')
    canvas.value.height = window.innerHeight * 0.75;
    canvas.value.width = window.innerWidth * 0.8;
    ctx.value = canvas.value.getContext('2d')
    ctx.value.fillStyle = "#070F20"
    ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
    playerPic.value = document.querySelector('#player')
    player.value = new Player(
      canvas.value.width / 2 - Player.width / 2,
      canvas.value.height - Player.height - 20
    )

    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i]--;
      if (bullets[i] < 0) {
        bullets.splice(i, 1);
      }
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i]--;
      if (enemies[i] < 0) {
        enemies.splice(i, 1);
      }
    }

    bottomEnemyPic.value = document.querySelector('#bottomEnemy')
    middleEnemyPic.value = document.querySelector('#middleEnemy')
    topEnemyPic.value = document.querySelector('#topEnemy')

    for(let i = 0; i < 15; i++) {
      let enemy = null
      let arrX = [20, 120, 220, 320, 420, canvas.value.width - 20, canvas.value.width - 120, canvas.value.width - 220, canvas.value.width - 320,
        canvas.value.width - 420, 20, 120, 220, 320, 420]
      if (i >= 0 && i < 5) {
        enemy = new BottomEnemy(arrX[i], 300)
      }
      if (i >= 5 && i < 10) {
        enemy = new MiddleEnemy(arrX[i], 170)
      }
      if (i >= 10 && i < 15) {
        enemy = new TopEnemy(arrX[i], 50)
      }
      enemies.push(enemy)
    }

    bulletPic.value = document.querySelector('#bullet')
  }

  render() {
    requestAnimationFrame(() => {
      ctx.value.fillStyle = "#070F20"
      ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
      player.value.draw(player.value.x, canvas.value.height - Player.height - 20)

      bullets.forEach((bullet, ind, obj) => {
        if (bullet.y < 0) {
          obj.splice(ind, 1)
        }
      });

      bullets.forEach(bullet => {
        if (bullet) {
          bullet.update()
          bullet.draw(bullet.x, bullet.y)
        }
      })

      enemies.forEach((enemy, ind) => {
        if (enemy) {
          if (enemy.x < 0) {
            enemy.direction = 'right'
          } else if (enemy.x + Enemy.width > canvas.value.width) {
            enemy.direction = 'left'
          }

          enemy.update()
          enemy.draw(enemy.x, enemy.y)
        }
      })
    })
  }

  start() {
    this._running = true

    this.intervalId = setInterval(() => {
      this.render()
    }, 1000 / 60)
  }

  stop() {
    this._running = false
    clearInterval(this.intervalId)
  }

  restart() {
    this.stop()
    this.init()
    this.start()
  }
}
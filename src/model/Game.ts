import Player from "@/model/Player";
import {canvas, ctx, modal, isModalShow, isWinShow} from "@/composables/initialState";
import {Enemy} from "@/model/Enemy";
import Bullet from "./Bullet";
import {ref} from "vue";

export let bullets = []
let enemies = []

export default class Game {
  private intervalId
  private _running = false
  private _player = null
  score = ref(0)

  get running() {
    return this._running
  }
  
  get player() {
    return this._player
  }

  private init() {
    canvas.value = document.querySelector('#canvas')
    canvas.value.height = window.innerHeight * 0.75;
    canvas.value.width = window.innerWidth * 0.8;
    ctx.value = canvas.value.getContext('2d')
    ctx.value.fillStyle = "#070F20"
    ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
    const playerPic = document.querySelector('#player')
    const bulletPic = document.querySelector('#bullet')
    this._player = new Player(
      canvas.value.width / 2 - Player.width / 2,
      canvas.value.height - Player.height - 20,
      playerPic,
      bulletPic
    )

    this.score.value = 0

    bullets = []
    enemies = []

    const bottomEnemyPic = document.querySelector('#bottomEnemy')
    const middleEnemyPic = document.querySelector('#middleEnemy')
    const topEnemyPic = document.querySelector('#topEnemy')

    for(let i = 0; i < 15; i++) {
      let enemy = null
      let arrX = [20, 120, 220, 320, 420, canvas.value.width - 20, canvas.value.width - 120, canvas.value.width - 220, canvas.value.width - 320,
        canvas.value.width - 420, 20, 120, 220, 320, 420]
      if (i >= 0 && i < 5) {
        enemy = new Enemy(arrX[i], 300, 'bottom', bottomEnemyPic)
      }
      if (i >= 5 && i < 10) {
        enemy = new Enemy(arrX[i], 170, 'middle', middleEnemyPic)
      }
      if (i >= 10 && i < 15) {
        enemy = new Enemy(arrX[i], 50, 'top', topEnemyPic)
      }
      enemies.push(enemy)
    }
  }

  private render() {
    requestAnimationFrame(() => {
      ctx.value.fillStyle = "#070F20"
      ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
      this._player.draw(this._player.x, canvas.value.height - Player.height - 20)

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

      enemies.forEach(enemy => {
        if (enemy) {
          const groupEnemies = enemies.filter(e => e.group === enemy.group)
          if (enemy.x < 0) {
            for (let groupEnemy of groupEnemies) {
              groupEnemy.direction = 'right'
            }
          } else if (enemy.x + Enemy.width > canvas.value.width) {
            for (let groupEnemy of groupEnemies) {
              groupEnemy.direction = 'left'
            }
          }
        }
      })

      enemies.forEach(enemy => {
        if (enemy) {
          enemy.update()
          enemy.draw(enemy.x, enemy.y)
        }
      })

      function hitEnemy(item1, item2) {
        let collision = true;
        if (
          item1.x > item2.x + Enemy.width ||
          item1.y > item2.y + Enemy.height ||
          item2.x > item1.x + Bullet.width ||
          item2.y > item1.y + Bullet.height
        ) {
          collision = false;
        }
        return collision;
      }

      enemies.forEach((enemy, i, enemyObj) => {
        bullets.forEach((bullet, j, bulletObj) => {
          let collision = hitEnemy(bullet, enemy);
          if (collision) {
            // delete bullet and enemy
            enemyObj.splice(i, 1)
            bulletObj.splice(j, 1)

            // increase score
            if (enemy.group === 'bottom') {
              this.score.value += 100
            } else if (enemy.group === 'middle') {
              this.score.value += 200
            } else {
              this.score.value += 300
            }
          }
        })
      })
    })

    if (!enemies.length) {
      isModalShow.value = modal.open()
      isWinShow.value = true
      this.stop()

      setTimeout(() => {
        isWinShow.value = false
      }, 2000)
    }
  }

  private resume() {
    this._running = true

    this.intervalId = setInterval(() => {
      this.render()
    }, 1000 / 60)
  }

  stop() {
    this._running = false
    clearInterval(this.intervalId)
  }

  start() {
    this.stop()
    this.init()
    this.resume()
  }
}
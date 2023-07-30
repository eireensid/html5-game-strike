import Player from "@/model/Player";
import {canvas, ctx, modal, isModalShow, isWinShow, newGame} from "@/composables/initialState";
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
  xp = ref(3)

  get running() {
    return this._running
  }
  
  get player() {
    return this._player
  }

  private init() {
    function onResize() {
      if (window.innerWidth >= 960) {
        canvas.value.width = window.innerWidth * 0.8
      } else {
        canvas.value.width = window.innerWidth * 0.95
      }
      canvas.value.height = window.innerHeight * 0.75
    }

    canvas.value = document.querySelector('#canvas')
    onResize()
    window.addEventListener('resize', onResize);

    ctx.value = canvas.value.getContext('2d')
    ctx.value.fillStyle = "#070F20"
    ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
    const playerPic = document.querySelector('#player')
    const bulletPic = document.querySelector('#bullet')

    Player.width = canvas.value.width * 0.065
    Player.height = canvas.value.width * 0.065 + 10

    Bullet.width = canvas.value.width * 0.024
    Bullet.height = canvas.value.width * 0.024

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

    Enemy.width = canvas.value.width * 0.05
    Enemy.height = canvas.value.width * 0.05

    for(let i = 0; i < 15; i++) {
      let enemy = null
      const distance = Enemy.width * 2 / 2.5
      const arrX = [0, Enemy.width + distance, Enemy.width * 2 + distance * 2, Enemy.width * 3 + distance * 3, Enemy.width * 4 + distance * 4,
        canvas.value.width, canvas.value.width - (Enemy.width + distance), canvas.value.width - (Enemy.width * 2 + distance * 2),
        canvas.value.width - (Enemy.width * 3 + distance * 3), canvas.value.width - (Enemy.width * 4 + distance * 4),
        0, Enemy.width + distance, Enemy.width * 2 + distance * 2, Enemy.width * 3 + distance * 3, Enemy.width * 4 + distance * 4]
      const bottomY = (canvas.value.height - (canvas.value.height - Player.height - 20 - Enemy.height * 3))
      if (i >= 0 && i < 5) {
        enemy = new Enemy(arrX[i], bottomY, 'bottom', bottomEnemyPic)
      }
      if (i >= 5 && i < 10) {
        enemy = new Enemy(arrX[i], bottomY * 2/3, 'middle', middleEnemyPic)
      }
      if (i >= 10 && i < 15) {
        enemy = new Enemy(arrX[i], bottomY / 3, 'top', topEnemyPic)
      }
      enemies.push(enemy)
    }

    function onKeyDown(e) {
      if (e.keyCode === 39) {
        newGame.player.goRight()
      } else if (e.keyCode === 37) {
        newGame.player.goLeft()
      } else if (e.keyCode === 32) {  // enter
        newGame.player.fire()
      }
    }
    document.addEventListener('keydown', onKeyDown);
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
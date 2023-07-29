import Player from "@/model/Player";
import {player, canvas, ctx, playerPic, bottomEnemyPic, bulletPic, bullets} from "@/composables/initialState";
import {bottomEnemy} from "@/composables/initialState";
import {BottomEnemy} from "@/model/Enemy";

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

    bottomEnemyPic.value = document.querySelector('#bottomEnemy')
    bottomEnemy.value = new BottomEnemy(20, 300)

    bulletPic.value = document.querySelector('#bullet')
  }

  render() {
    requestAnimationFrame(() => {
      ctx.value.fillStyle = "#070F20"
      ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
      player.value.draw(player.value.x, canvas.value.height - Player.height - 20)
      bottomEnemy.value.draw(20, 300)

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
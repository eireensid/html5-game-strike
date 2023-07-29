import Player from "@/model/Player";
import {player, canvas, ctx, weapon} from "@/composables/initialState";
import {bottomEnemy} from "@/composables/initialState";
import Weapon from "@/model/Weapon";

export default class Game {
  constructor() {
    if (Game._instance) {
      throw new Error("Singleton classes can't be instantiated more than once.")
    }
    Game._instance = this;
  }

  init() {

  }

  render() {
    requestAnimationFrame(() => {
      ctx.value.fillStyle = "#070F20"
      ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
      player.value.draw(player.value.x, canvas.value.height - Player.height - 20)
      bottomEnemy.value.draw(20, 300)
      weapon.value.draw(canvas.value.width / 2 - Weapon.width / 2, 200)
    })
  }

  start() {
    console.log('start game')
  }
  pause() {

  }
  continue() {

  }
  restart() {

  }
}
import Player from "@/model/Player";
import {player, canvas, ctx, playerPic} from "@/composables/initialState";
import {bottomEnemy} from "@/composables/initialState";

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
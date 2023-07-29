import Player from "@/model/Player";
import {player} from "@/composables/globalVars";

export default class Game {
  constructor() {
    if (Game._instance) {
      throw new Error("Singleton classes can't be instantiated more than once.")
    }
    Game._instance = this;
  }

  init() {

  }

  render(canvas, ctx, pic) {
    requestAnimationFrame(() => {
      ctx.fillStyle = "#070F20"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      player.value.draw(ctx, pic, player.value.x, canvas.height - Player.height - 20, Player.width, Player.height)
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
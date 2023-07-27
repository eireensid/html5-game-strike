export default class Game {
  constructor() {
    if (Game._instance) {
      throw new Error("Singleton classes can't be instantiated more than once.")
    }
    Game._instance = this;
  }
  start() {
    console.log('start game')
  }
  pause() {

  }
  continue() {

  }
  end() {

  }
}
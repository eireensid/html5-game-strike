export default class Modal {
  isShow: boolean

  constructor(isShow = true) {
    this.isShow = isShow
  }

  open() {
    return this.isShow = true
  }
  close() {
    return this.isShow = false
  }
}
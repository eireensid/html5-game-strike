export default class Modal {
  private isShow: boolean

  constructor(isShow = true) {
    this.isShow = isShow
  }

  get isShow() {
    return this.isShow
  }

  open() {
    return this.isShow = true
  }
  close() {
    return this.isShow = false
  }
}
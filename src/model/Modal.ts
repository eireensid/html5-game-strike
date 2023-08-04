import { ref } from 'vue'

export default class Modal {
	private _isShow = true
	private _message = ref('Welcome to the game!')
	private _isBtnShow = true

	get isShow() {
		return this._isShow
	}

	get isBtnShow() {
		return this._isBtnShow
	}

	get message() {
		return this._message.value
	}

	set message(mes) {
		this._message.value = mes
	}

	constructor(isShow = true) {
		this._isShow = isShow
	}

	open(text) {
		this.message = text
		return (this._isShow = true)
	}

	close() {
		return (this._isShow = false)
	}

	toggleBtn(bool) {
		return (this._isBtnShow = bool)
	}
}

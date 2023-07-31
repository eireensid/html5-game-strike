import Game from '@/model/Game'
import Modal from '@/model/Modal'
import { ref } from 'vue'

export const newGame = new Game()
export const modal = new Modal()

export const canvas = ref(null)
export const ctx = ref(null)

export const isModalShow = ref(modal.isShow)
export const isWinShow = ref(modal.isWinShow)

import Game from "@/model/Game";
import Modal from "@/model/Modal";
import {ref} from "vue";

export const newGame = new Game()
export const modal = new Modal()
export const player = ref(null)
export const bullet = ref(null)

export const canvas = ref(null);
export const ctx = ref(null);
export const playerPic = ref(null)
export const bottomEnemyPic = ref(null)
export const middleEnemyPic = ref(null)
export const topEnemyPic = ref(null)
export const bulletPic = ref(null)

export const bullets = []
export const enemies = []

export const isModalShow = ref(modal.isShow)
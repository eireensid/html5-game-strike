import Game from "@/model/Game";
import Modal from "@/model/Modal";
import {ref} from "vue";

export const newGame = new Game()
export const modal = new Modal()
export const player = ref(null)
export const bottomEnemy = ref(null)

export const canvas = ref(null);
export const ctx = ref(null);
export const playerPic = ref(null)
export const bottomEnemyPic = ref(null)

export const isModalShow = ref(modal.isShow)
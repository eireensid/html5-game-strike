export default abstract class GameSprites {
	static get playerPic() {
		return document.querySelector('#player') as HTMLImageElement
	}
	static get bulletPic() {
		return document.querySelector('#bullet') as HTMLImageElement
	}
	static get bottomEnemyPic() {
		return document.querySelector('#bottomEnemy') as HTMLImageElement
	}
	static get middleEnemyPic() {
		return document.querySelector('#middleEnemy') as HTMLImageElement
	}
	static get topEnemyPic() {
		return document.querySelector('#topEnemy') as HTMLImageElement
	}
}

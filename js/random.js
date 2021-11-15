class random
{
	static getRandomMove(boardPosition, possibleMoves){
		var game = new Chess(boardPosition)
		var randomIdx = Math.floor(Math.random() * possibleMoves.length)
		game.move(possibleMoves[randomIdx])
		return game.fen()
	}
}
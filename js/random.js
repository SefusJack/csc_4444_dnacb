function getRandomMove(boardPosition, possibleMoves){
	var randomIdx = Math.floor(Math.random() * possibleMoves.length)
	return possibleMoves[randomIdx]
}
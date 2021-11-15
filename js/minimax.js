function getMinimaxMove(boardPosition, possibleMoves){
    var game = new Chess(boardPosition)
    var randomIdx = Math.floor(Math.random() * possibleMoves.length)
    console.log(possibleMoves)
    game.move(possibleMoves[randomIdx])
    getPieceValue()
    return game.fen()
  }

function getPieceValue(){
}
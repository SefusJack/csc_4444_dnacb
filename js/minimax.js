function getMinimaxMove(boardPosition, possibleMoves){
    var game = new Chess(boardPosition)
    var randomIdx = Math.floor(Math.random() * possibleMoves.length)
    console.log(possibleMoves)
    console.log(evaluateBoard(game))
    console.log('***************************************************')
    game.move(possibleMoves[randomIdx])
    getPieceValue()
    return game.fen()
  }

function getPieceValue(){
}
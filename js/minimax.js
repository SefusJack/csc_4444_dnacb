class minimax
{
  static getMove(boardPosition, possibleMoves){
    var game = new Chess(boardPosition)
    var randomIdx = Math.floor(Math.random() * possibleMoves.length)
    console.log(possibleMoves)
    console.log(evaluateBoard(game))
    console.log('***************************************************')
    game.move(possibleMoves[randomIdx])
    return game.fen()
  }
  
  static evaluateBoard(board) {
    var totalEvaluation = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(board[i][j]);
        }
    }
    return totalEvaluation;
  }
  // function getPieceValue(piece){
  //   if (pieace.type === null){return 0}
  //   else if (piece.type === 'p'){return 1}
  //   else if (piece.type === 'n' || piece.type == 'b'){return 3}
  //   else if (piece.type === 'r'){return 5}
  //   else if (piece.type === 'q'){return 9}
  //   else if (piece.type === 'k'){return 100}
  // }
}
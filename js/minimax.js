function getMinimaxMove(boardPosition, possibleMoves){
    var game = new Chess(boardPosition)
    var randomIdx = Math.floor(Math.random() * possibleMoves.length)
    var boardValues = [[0, 0, 0, 0, 0, 0, 0, 0], 
                       [0, 0, 0, 0, 0, 0, 0, 0], 
                       [0, 0, 0, 0, 0, 0, 0, 0], 
                       [0, 0, 0, 0, 0, 0, 0, 0], 
                       [0, 0, 0, 0, 0, 0, 0, 0], 
                       [0, 0, 0, 0, 0, 0, 0, 0], 
                       [0, 0, 0, 0, 0, 0, 0, 0], 
                       [0, 0, 0, 0, 0, 0, 0, 0]];
    var rankDict = { 'a':0,'b':1,'c':2,'d':3,'e':4,'f':5,'g':6,'h':7 }
    var moveL = '1ab'
    console.log(moveL.length)
    console.log(possibleMoves)
    console.log(evaluateBoard(game.board(), boardValues))
    console.log(boardValues[0])

    game.move(possibleMoves[randomIdx])
    return game.fen()
  }

var evaluateBoard = function (board, boardValues){
  var totalEvaluation = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
          totalEvaluation = totalEvaluation + getPieceValue(board[i][j]);
          boardValues[i][j] = getPieceValue(board[i][j]);
        }
    }
    return totalEvaluation;
}

var getPieceValue = function (piece) {
  if (piece === null) {
      return 0;
  }
  var getAbsoluteValue = function (piece) {
      if (piece.type === 'p') {
          return 10;
      } else if (piece.type === 'r') {
          return 50;
      } else if (piece.type === 'n') {
          return 30;
      } else if (piece.type === 'b') {
          return 30 ;
      } else if (piece.type === 'q') {
          return 90;
      } else if (piece.type === 'k') {
          return 900;
      }
      throw "Unknown piece type: " + piece.type;
  };

  var absoluteValue = getAbsoluteValue(piece, piece.color === 'w');
  return piece.color === 'w' ? absoluteValue : -absoluteValue;
}

var evaluateMove = function(move, boardValues)
{
  for(var i = 0; i < move.length; i++)
  {
    //if()
    //else 
    //{
      //find the location of the move in board values; return the value that it gets from the piece taken
      // plus the position value matrix
    //}
  }
};
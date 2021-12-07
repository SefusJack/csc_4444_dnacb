
var rankDict = { 'a':0,'b':1,'c':2,'d':3,'e':4,'f':5,'g':6,'h':7 }

function getMinimaxMove(boardPosition, possibleMoves){
    var game = new Chess(boardPosition)
    var boardValues = [[0, 0, 0, 0, 0, 0, 0, 0], 
                       [0, 0, 0, 0, 0, 0, 0, 0], 
                       [0, 0, 0, 0, 0, 0, 0, 0], 
                       [0, 0, 0, 0, 0, 0, 0, 0], 
                       [0, 0, 0, 0, 0, 0, 0, 0], 
                       [0, 0, 0, 0, 0, 0, 0, 0], 
                       [0, 0, 0, 0, 0, 0, 0, 0], 
                       [0, 0, 0, 0, 0, 0, 0, 0]];

    boardEvaluation = evaluateBoard(game.board(), boardValues)

    var valuedMoves = []
    valuedMoves = evaluateMoves(game, boardValues)

    // console.log("Board Value Matrix: ", boardValues)
    // console.log("Possible moves for black: ", possibleMoves)
    // console.log("Converted value moves for black: \n", valuedMoves)
    var bestMove
    if(algorithm == 1)
    {
      bestMove = breadthFirstSearch(game, 2, false);
      if(bestMove[1] < 0)
      {
        //console.log(bestMove[1], possibleMoves[bestMove[1]])
        game.move(possibleMoves[0])
      }
      else
      {
        //console.log(bestMove[1], possibleMoves[bestMove[1]])
        game.move(possibleMoves[bestMove[1]])
      }

      //console.log(possibleMoves)
      //console.log("BEST MOVE DETERMINED: ", bestMove[0])
      //console.log("BEST MOVE INDEX: ", bestMove[1])
    }
    if(algorithm == 2)
    {
      bestMove = depthFirstSearch(game, depthIn, false);
      if(bestMove[1] < 0)
      {
        //console.log(bestMove[1], possibleMoves[bestMove[1]])
        game.move(possibleMoves[0])
      }
      else
      {
        game.move(possibleMoves[bestMove[1]])
      }

      //console.log(possibleMoves)
      //console.log("BEST MOVE DETERMINED: ", bestMove[0])
      //console.log("BEST MOVE INDEX: ", bestMove[1])
    }
    return possibleMoves[bestMove[1]]
  }

//Returns board value matrix
var evaluateBoard = function (board, boardValues){
  var totalEvaluation = 0;
    for (var i = 7; i >= 0; i--) {
        for (var j = 7; j >= 0; j--) {
          totalEvaluation = totalEvaluation + getPieceValue(board[i][j]);
          boardValues[i][j] = getPieceValue(board[i][j]);
        }
    }
    return totalEvaluation;
}

//returns individual piece value
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

//takes possible moves in game and the value board matrix and position value matrix to return what each move
//is valued as; returns the array of possible moves as an array of values
//i.e. instead of ['Ne6', 'Na6', ...], changes to ['-30', '0', ...]
var evaluateMoves = function(game, boardValues)
{ 
  console.log("evaluate");
  evaluations = evaluations + 1
  var possibleMoves = game.moves();
  var newMoves = []
  var invertDict = {0 : 7, 1:6, 2:5, 3:4, 4:3, 5:2, 6:1, 7:0 }
  for(var i = 0; i < possibleMoves.length; i++)
  {

    var targetMove = possibleMoves[i];
    var moveLength = targetMove.length;
    var index = 0;

    if(moveLength == 3 && targetMove.includes('+'))
    { 
      index = 0;
    }
    //if of form b3+
    else if((moveLength == 4 && targetMove.includes('+')) || moveLength == 3)
    {
      index+=1;
    }
    //if of form Bxd3 or Bxd3+
    else if((moveLength == 4 && targetMove.includes('x')) || moveLength == 5)
    {
      index+=2;
    }
    //Castles implementation
    else if(targetMove.includes('O'))
    {
      index = 0;
    }

    row = rankDict[possibleMoves[i][index]];
    column = invertDict[parseInt(possibleMoves[i][index+1]) - 1];
    if(column == undefined)
      continue;
    if(row == null)
      continue;

    //console.log("Board move: ", possibleMoves[i][index], possibleMoves[i][index+1], ", ", "Matrix move: ", column, row, "Corresponding board value: ", boardValues[column][row])
    newMoves.push(boardValues[column][row]);
  }
  //console.log("newMoves",newMoves);
  return newMoves;
};

//function that takes a game board and calculates the pressure applied to each square on the board
//returns a value matrix where positive squares indicate white advantage and negative squares
//indicate black advantage
function safeSquares(game)
{
  //2D 8x8 array of form [[{type: 'r', color: 'b'}, ...]
  board = game.board();
  //if piece value is negative, invert values for pawn
};

var getMax = function(arrayC)
{
  var MAX = arrayC[0];
  for(var i = 0; i<arrayC.length;i++)
  {
    if(arrayC[i]>MAX)
      MAX = arrayC[i];
  }
  return MAX;
}
var getMin = function(arrayC)
{
  var MIN = arrayC[0];
  for(var i = 0; i<arrayC.length;i++)
  {
    if(arrayC[i]<MIN)
      MIN = arrayC[i];
  }
  return MIN;
}

var breadthFirstSearch = function(game, depth, isMaximizingPlayer)
  {
    var possibleMoves = game.moves();
    var boardValues = [[0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0]];
    var totalEvaluation, valueMoves, bestValue;
    var nextGames = [];

    var originalGame = game.pgn();
    var originalFen = game.fen();

    for (var i = 0; i < possibleMoves.length; i++)
    {
      game.move(possibleMoves[i]); 
      //console.log("pgn = ", game.pgn());
      nextGames.push(game.pgn());
      game.undo();
    }

    var bestMove = [-9999, -1];
    var bestMovesArray = [];
    var possibleMoves2 = [];
    var valueMoves = [];

    for (var i = 0; i < nextGames.length; i++)
    {
      game = new Chess();
      game.load_pgn(nextGames[i]);
      possibleMoves2 = game.moves();
      for (var j = 0; j < possibleMoves2.length; j++)
      {
        game.move(possibleMoves2[j]);
        totalEvaluation = evaluateBoard(game.board(), boardValues);
        valueMoves.push(getMax(evaluateMoves(game, boardValues)));
        game.undo();
      }
      bestMovesArray.push([getMax(valueMoves), 0]);
      game = new Chess();
    }
    var bestofthebest = [];
    for(var i = 0; i < possibleMoves.length; i++)
    {
      if(bestMovesArray[i][0] > bestMove[0])
      {
        bestofthebest = [];
        bestofthebest.push([bestMovesArray[i][0],i])
        bestMove[0] = bestMovesArray[i][0];
        bestMove[1] = i;
      }
      else if(bestMovesArray[i][0] == bestMove[0])
      {
        bestofthebest.push([bestMovesArray[i][0],i])
      }
      if(bestofthebest.length > 1)
      {
        var randombest = Math.floor(Math.random() * bestofthebest.length)
        bestMove = bestofthebest[randombest]
      }
    }
    console.log("BFS decided: " + possibleMoves[bestMove[1]] + " was the best move")
    game = new Chess(originalFen);
    return bestMove;
  }
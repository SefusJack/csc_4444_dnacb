
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

var depthFirstSearch = function(game, depth, isMaximizingPlayer)
  {
    //boardPosition = game.fen() which returns a new board  
    var possibleMoves = game.moves();
    
    //this will be an array of moves converted to values; i.e.
    //from this: ["Kg6","Rh5","Rh4","Rh3","Be1"]
    //to this: ["10","0","50","90","-10"]

    //Goal: find the max value for a given move in the array from it's child state spaces; 
    //When completed, return the best move
    if(isMaximizingPlayer == true)
    {
        if(depth <= 0)
      {
        //a blank board; will be filled in with values in evaluateBoard then used
        //to fill in values for valueMoves using evaluateMoves
        var boardValues = [[0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0]];
        var totalEvaluation = evaluateBoard(game.board(), boardValues);
        var valueMoves = evaluateMoves(game, boardValues);
        var bestValue = getMin(valueMoves);
        console.log(boardValues, valueMoves);
        console.log("Fringe best value for white: ", bestValue)
        return [bestValue, 0];
      }
      var bestMove = [-9999, -1];
      var bestMovesArray = [];
      for(var i = 0; i < possibleMoves.length; i++)
      {
          //Iterate to the next move
          game.move(possibleMoves[i]);
          //Search node i in possiblemoves
          bestMovesArray.push(depthFirstSearch(game, depth - 1, false));
          //undo the move to maintain the board state and move onto the next move
          game.undo();
      }
      for(var i = 0; i < possibleMoves.length; i++)
      {
        if(bestMovesArray[i][0] > bestMove[0])
        {
          bestMove[0] = bestMovesArray[i][0];
          bestMove[1] = i;
        }
      }

        console.log("Best maximized move depth ", depth, ": ", bestMove);
        return bestMove;
    }
    //trying to minimize this value
    else if(isMaximizingPlayer == false)
    {
      if(depth <= 0)
      {
        var boardValues = [[0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0]];
        //use total evaluation as the end then add evaluateMoves in during the list to determine max point value
        //rn evaluatemoves does not take the future move and therefore returns nothing for depth 1
        var totalEvaluation = evaluateBoard(game.board(), boardValues);
        var valueMoves = evaluateMoves(game, boardValues);
        var bestValue = getMax(valueMoves);
        console.log(boardValues, valueMoves);
        console.log("Fringe best value for black: ", bestValue)
        return [bestValue, 0];
      }

      var bestMove = [9999, -1];
      var bestMovesArray = [];
      for(var i = 0; i < possibleMoves.length; i++)
      {
          //Iterate to the next move
          game.move(possibleMoves[i]);

          bestMovesArray.push(depthFirstSearch(game, depth - 1, true));
          game.undo();
      }
      for(var i = 0; i < possibleMoves.length; i++)
      {
        if(bestMovesArray[i][0] < bestMove[0])
        {
          bestMove[0] = bestMovesArray[i][0];
          bestMove[1] = i;
        }
      }
        return bestMove;
    }
  }



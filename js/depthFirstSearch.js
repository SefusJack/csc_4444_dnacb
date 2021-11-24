import { evaluateMoves } from './minimax';
var maxAmountOfTime = 3000; //3 seconds
const p1 = new Promise((res) => setTimeout(() => res("p1"), maxAmountOfTime));
//returns the best move found in depth-first search
var depthFirstSearch = function(game, depth, isMaximizingPlayer)
  {
    if(depth === 0)
        return -valueMoves;
    //boardPosition = game.fen() which returns a new board  
    var possibleMoves = game.moves();
    
    //this will be an array of moves converted to values; i.e.
    //from this: ["Kg6","Rh5","Rh4","Rh3","Be1"]
    //to this: ["10","0","50","90","-10"]
    valueMoves = evaluateMoves(game, boardValues);
    bestMove = -9999;
    //Goal: find the max value for a given move in the array from it's child state spaces; 
    //When completed, return the best move
    if(isMaximizingPlayer)
    {
        bestMove = -9999;
    for(var i = 0; i < valueMoves.length; i++)
    {
        //Iterate to the next move
        game.move(possibleMoves[i]);
        //Search each node in possible moves and return the summed up results
        //to resolved moves
        bestMove = Math.max(depthFirstSearch(game, depth - 1, !isMaximizingPlayer));
        game.undo();
    }
        return bestMove;
    }
    else
    {
        bestMove = 9999;
    for(var i = 0; i < valueMoves.length; i++)
    {
        //Iterate to the next move
        game.move(possibleMoves[i]);
        //Search each node in possible moves and return the summed up results
        //to resolved moves
        bestMove = Math.min(depthFirstSearch(game.fen(), depth - 1, !isMaximizingPlayer));
        game.undo();
    }
        return bestMove;
    }
  }


  const doSomething = function(){
    return new Promise((resolve, reject) => {
      /*
      TODO: try to do something asynchronously
      and resolve or reject according to
      operation result.
      */
    })
  };
  
  // Call doSomething and receive a Promise as return
  let doIt = doSomething()
  
  // Wait for the promise to get resolved...
  doIt.then(response => {
    // Use response
  })
  
  // ... or to get rejected
  doIt.catch(error => {
    // Deal with error
  })



  export{depthFirstSearch};
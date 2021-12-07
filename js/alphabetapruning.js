function getAlphaBetaPruning(boardPosition, possibleMoves)
{
    var game = new Chess(boardPosition)
    var bestMove = depthFirstSearch(game, 1, false);
}
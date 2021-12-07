function getAlphaBetaPruningMove(boardPosition, possibleMoves)
{
    var game = new Chess(boardPosition)
    var bestMoves = depthFirstSearch(game, 1, false);
    console.log(bestMoves)
    return possibleMoves[bestMoves[0]]
}
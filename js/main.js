
var board = null

var game = new Chess()

var movemade = null

var evaluations = 0

function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false
  // only pick up pieces for White
  if (piece.search(/^b/) !== -1) return false

}

function onDrop (source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })
  // illegal move
  if (move === null) return 'snapback'
  // make random legal move for black
  movemade = move.to
  console.log("Move that was made: " + movemade)
  evaluations = 0
  if(algorithm == 0 || algorithm == 1 || algorithm == 2)
  {
  	makeMove()
  }
  else
  {
	makeMLMove()
  }
  document.getElementById("evaluations").innerHTML = evaluations;
}

function makeMove(){
	var possibleMoves = game.moves()
	var boardPosition = game.fen()
	//game over
	if(possibleMoves.length === 0)
		return
	//var randomIdx = Math.floor(Math.random() * possibleMoves.length)
	console.log(possibleMoves)
	if(algorithm == 0)
		game.move(getRandomMove(boardPosition, possibleMoves))
	else if(algorithm == 1 || algorithm == 2)  
		game.move(getMinimaxMove(boardPosition, possibleMoves))

	board.position(game.fen())
}

async function makeMLMove()
{
	var possibleMoves = game.moves()
	var boardPosition = game.fen()
	//game over
	if(possibleMoves.length === 0)
		return
  evaluations = possibleMoves.length
  console.log(possibleMoves)
	test = await getMLMove(boardPosition, possibleMoves, movemade)
	//
	game.move(test)
	board.position(game.fen())
}

// update the board position after the piece snap

// for castling, en passant, pawn promotion

function onSnapEnd () {

  board.position(game.fen())

}

var config = {

  draggable: true,

  position: 'start',

  onDragStart: onDragStart,

  onDrop: onDrop,

  onSnapEnd: onSnapEnd

}

board = Chessboard('myBoard', config)


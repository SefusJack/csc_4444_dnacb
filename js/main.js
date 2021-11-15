var board = null

var game = new Chess()

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
  makeMove()

}

function makeMove(){
	var possibleMoves = game.moves()
	var boardPosition = game.fen()
	console.log(boardPosition)
	//game over
	if(possibleMoves.length === 0)
		return
	var result = random.getMove(boardPosition, possibleMoves)
	console.log(result)
	game.load(result)
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


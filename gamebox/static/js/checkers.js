var checkerBoardCopy;
var turn = true;

let startCheckers = function() {
	// Copy board for restart
	checkerBoardCopy = document.getElementById('board-container').cloneNode(true);

	// Add onclick event to each spot
	let allSpots = document.getElementsByClassName('board-spot');
	for (let i = 0; i < allSpots.length; i++) {
		let spot = allSpots[i];
		spot.onclick = () => spotClick(spot);
	}

	// General Setup
	generatePieces();
	highlightCurrentTurn();
}

let generatePieces = function() {
	// Generate WhitePieces
	let whiteSpaces = document.getElementsByClassName('white');
	for (let i = 0; i < whiteSpaces.length; i++) {
		let newPiece = document.createElement('div');
		newPiece.classList.add('white-piece', 'piece');
		whiteSpaces[i].appendChild(newPiece);
	}

	// Generate BlackPieces
	let blackSpaces = document.getElementsByClassName('black');
	for (let i = 0; i < whiteSpaces.length; i++) {
		let newPiece = document.createElement('div');
		newPiece.classList.add('black-piece', 'piece');
		blackSpaces[i].appendChild(newPiece);
	}
}

let highlightCurrentTurn = function() {
	let whitePieces = document.getElementsByClassName('white');
	for (let i = 0; i < whitePieces.length; i++) {
		let piece = whitePieces[i];
		if (turn) {
			piece.classList.add('turn');
		} else {
			piece.classList.remove('turn');
		}
	}

	let blackPieces = document.getElementsByClassName('black');
	for (let i = 0; i < blackPieces.length; i++) {
		let piece = blackPieces[i];
		if (!turn) {
			piece.classList.add('turn');
		} else {
			piece.classList.remove('turn');
		}
	}
}

let spotClick = function(spot) {
	console.log(spot);
}
var checkerBoardCopy;
var turn = true;
var pieceSelected = null;

let startCheckers = function() {
	// Copy board for restart
	checkerBoardCopy = document.getElementById('board-container').cloneNode(true);
	var turn = true;
	var pieceSelected = null;

	// Add onclick event to each spot
	let allSpots = document.getElementsByClassName('board-spot');
	for (let i = 0; i < allSpots.length; i++) {
		let spot = allSpots[i];
		spot.id = i;
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

let removeAllHighlights = function() {
	let whitePieces = document.getElementsByClassName('white');
	for (let i = 0; i < whitePieces.length; i++) {
		whitePieces[i].classList.remove('turn');
	}

	let blackPieces = document.getElementsByClassName('black');
	for (let i = 0; i < blackPieces.length; i++) {
		let piece = blackPieces[i];
		blackPieces[i].classList.remove('turn');
	}
}

let spotClick = function(spot) {
	if (!pieceSelected && spot.classList.contains('turn')) {
		removeAllHighlights();
		spot.classList.add('turn');
		pieceSelected = spot;
	} else if (pieceSelected && getPossMoves(pieceSelected).includes(Number(spot.id))) {
		movePiece(pieceSelected, spot);
		pieceSelected = null;
		turn = !turn;
		highlightCurrentTurn();
	} else {
		pieceSelected = null;
		highlightCurrentTurn();
	}
}

let getRow = spot => Math.floor(Number(spot.id) / 8);
let getSpotColor = spot => spot.classList.contains('white') ? 'white': spot.classList.contains('black') ? 'black':'blank';
let isInBoard = id => ((-1 < id) && (id < 64));

let getPossMoves = function(spot) {
	let spotId = Number(spot.id);
	let spotColor = getSpotColor(spot);
	let row = getRow(spot);
	let direction = turn ? 1:-1;
	var possMoves = [];

	if (isInBoard(direction * 7 + spotId)
		&& Math.abs(getRow(document.getElementById(direction * 7 + spotId)) - row) === 1) {
		if (getSpotColor(document.getElementById(direction * 7 + spotId)) === 'blank') {
			possMoves.push(direction * 7 + spotId);
		} else if (getSpotColor(document.getElementById(direction * 7 + spotId)) != spotColor
			&& isInBoard(direction * 14 + spotId)
			&& getSpotColor(document.getElementById(direction * 14 + spotId)) === 'blank'
			&& Math.abs(getRow(document.getElementById(direction * 14 + spotId)) - row) === 2) {
			possMoves.push(direction * 14 + spotId);
		}
	}
	if (isInBoard(direction * 9 + spotId)
		&& Math.abs(getRow(document.getElementById(direction * 9 + spotId)) - row) === 1) {
		if (getSpotColor(document.getElementById(direction * 9 + spotId)) === 'blank'
			&& isInBoard(direction * 9 + spotId)) {
			possMoves.push(direction * 9 + spotId);
		} else if (getSpotColor(document.getElementById(direction * 9 + spotId)) != spotColor
			&& isInBoard(direction * 18 + spotId)
			&& getSpotColor(document.getElementById(direction * 18 + spotId)) === 'blank'
			&& Math.abs(getRow(document.getElementById(direction * 18 + spotId)) - row) === 2) {
			possMoves.push(direction * 18 + spotId);
		}
	}

	// if the piece is a king
	if (spot.classList.contains('king')) {
		direction = turn ? -1:1;
		if (isInBoard(direction * 7 + spotId)
			&& Math.abs(getRow(document.getElementById(direction * 7 + spotId)) - row) === 1) {
			if (getSpotColor(document.getElementById(direction * 7 + spotId)) === 'blank') {
				possMoves.push(direction * 7 + spotId);
			} else if (getSpotColor(document.getElementById(direction * 7 + spotId)) != spotColor
				&& isInBoard(direction * 14 + spotId)
				&& getSpotColor(document.getElementById(direction * 14 + spotId)) === 'blank'
				&& Math.abs(getRow(document.getElementById(direction * 14 + spotId)) - row) === 2) {
				possMoves.push(direction * 14 + spotId);
			}
		}
		if (isInBoard(direction * 9 + spotId)
			&& Math.abs(getRow(document.getElementById(direction * 9 + spotId)) - row) === 1) {
			if (getSpotColor(document.getElementById(direction * 9 + spotId)) === 'blank'
				&& isInBoard(direction * 9 + spotId)) {
				possMoves.push(direction * 9 + spotId);
			} else if (getSpotColor(document.getElementById(direction * 9 + spotId)) != spotColor
				&& isInBoard(direction * 18 + spotId)
				&& getSpotColor(document.getElementById(direction * 18 + spotId)) === 'blank'
				&& Math.abs(getRow(document.getElementById(direction * 18 + spotId)) - row) === 2) {
				possMoves.push(direction * 18 + spotId);
			}
		}
	}

	return possMoves;
}

let movePiece = function(fromPos, toPos) {
	// Change 'from' and 'to' classes
	let classChange = turn ? 'white':'black';
	toPos.classList.add(classChange);
	if (fromPos.classList.contains('king')) toPos.classList.add('king');
	fromPos.classList.remove(classChange, 'turn', 'king');

	// Remove 'from' piece
	while (fromPos.lastChild) fromPos.removeChild(fromPos.lastChild);

	// Add 'to' piece
	let newPiece = document.createElement('div');
	newPiece.classList.add(`${ classChange }-piece`, 'piece');
	toPos.appendChild(newPiece);

	let direction = turn ? 1:-1;

	// Check if piece has been jumped
	if (Math.abs(getRow(toPos) - getRow(fromPos)) === 2) {
		if (Number(toPos.id) === direction * 14 + Number(fromPos.id)) {
			let node = document.getElementById(direction * 7 + Number(fromPos.id));
			node.classList.remove((turn ? 'black':'white'));
			while (node.lastChild) {
				node.removeChild(node.lastChild);
			}
		} else {
			let node = document.getElementById(direction * 9 + Number(fromPos.id));
			node.classList.remove((turn ? 'black':'white'));
			while (node.lastChild) {
				node.removeChild(node.lastChild);
			}
		}
	}

	// Check if piece moved has become a king
	if ((getRow(toPos) === 0 && toPos.classList.contains('black'))
		|| (getRow(toPos) === 7 && toPos.classList.contains('white'))) {
		toPos.classList.add('king');
	}
}

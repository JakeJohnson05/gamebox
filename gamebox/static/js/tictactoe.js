var turn = true;
var playing = true;

let setUp = function() {
	turn = Math.random() <= 0.5;
	playing = true;
	let gameBoard = document.getElementById('game-board-container');

	// Clear gameboard spots
	while (gameBoard.lastChild) {
		gameBoard.removeChild(gameBoard.lastChild);
	}

	// Add all game-spots
	for (let i = 0; i < 9; i++) {
		let gameSpot = document.createElement('div');
		gameSpot.classList.add('game-spot');
		gameSpot.id = i;
		gameSpot.onclick = () => spotClick(i);
		gameBoard.appendChild(gameSpot);
	}

	updatePlayerIndicator();
}

let spotClick = function(spotId) {
	let spot = document.getElementById(spotId);

	if (spot.innerHTML === '' && playing) {
		spot.innerHTML = turn ? 'X':'O';
		spot.style.color = turn ? 'red':'blue';
		turn = !turn;
	}

	checkWin();
	if (playing) updatePlayerIndicator();
}

let updatePlayerIndicator = function() {
	// Add/Remove class: turn depending on whose turn it is
	let playerIndicators = document.getElementsByClassName('player-info');
	playerIndicators[Number(!turn)].classList.add('turn');
	playerIndicators[Number(turn)].classList.remove('turn');
}

let checkWin = function() {
	// Get all game positions in an 2-d array
	let allGameSpots = document.getElementsByClassName('game-spot');
	let boardPos = [
		[allGameSpots[0].innerHTML, allGameSpots[1].innerHTML, allGameSpots[2].innerHTML],
		[allGameSpots[3].innerHTML, allGameSpots[4].innerHTML, allGameSpots[5].innerHTML],
		[allGameSpots[6].innerHTML, allGameSpots[7].innerHTML, allGameSpots[8].innerHTML],
	];

	// ------- Check all win posibilities -------
	for (let i = 0; i < 3; i++) {
		// Check all rows
		if (playing && boardPos[i][0] != '' && boardPos[i][0] === boardPos[i][1] && boardPos[i][1] === boardPos[i][2]) {
			highlightWin(i * 3, i * 3 + 1, i * 3 + 2);
		} 
		// check all columns
		else if (playing && boardPos[0][i] != '' && boardPos[0][i] === boardPos[1][i] && boardPos[1][i] === boardPos[2][i]) {
			highlightWin(i, i + 3, i + 6);
		}
	}

	// Check Diagonal
	if (playing && boardPos[0][0] != '' && boardPos[0][0] === boardPos[1][1] && boardPos[1][1] === boardPos[2][2]) {
		highlightWin(0, 4, 8);
	} else if (playing && boardPos[0][2] != '' && boardPos[0][2] === boardPos[1][1] && boardPos[1][1] === boardPos[2][0]) {
		highlightWin(2, 4, 6);
	}
}

let highlightWin = function(id1, id2, id3) {
	playing = false
	let allGameSpots = document.getElementsByClassName('game-spot');
	allGameSpots[id1].classList.add('win-pos'); 
	allGameSpots[id2].classList.add('win-pos'); 
	allGameSpots[id3].classList.add('win-pos'); 
}
const boxes = Array.from(document.querySelectorAll('.box'));
const resetBtn = document.getElementById('reset-btn');
const statusEl = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
	[0,1,2], [3,4,5], [6,7,8],
	[0,3,6], [1,4,7], [2,5,8],
	[0,4,8], [2,4,6]
];

function handleBoxClick(e) {
	const box = e.currentTarget;
	const index = boxes.indexOf(box);
	if (!gameActive || box.textContent.trim() !== '') return;

	box.textContent = currentPlayer;
	box.setAttribute('aria-label', currentPlayer);

	if (checkWin()) {
		statusEl.textContent = `${currentPlayer} Wins!`;
		gameActive = false;
		return;
	}

	if (isDraw()) {
		statusEl.textContent = `It's a Draw`;
		gameActive = false;
		return;
	}

	currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
	statusEl.textContent = `${currentPlayer}'s Turn`;
}

function checkWin() {
	const board = boxes.map(b => b.textContent.trim());
	return winningCombinations.some(combo => {
		const [a,b,c] = combo;
		return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
	});
}

function isDraw() {
	return boxes.every(b => b.textContent.trim() !== '');
}

function resetGame() {
	boxes.forEach(b => { b.textContent = ''; b.removeAttribute('aria-label'); });
	currentPlayer = 'X';
	gameActive = true;
	statusEl.textContent = `X's Turn`;
}

boxes.forEach(box => box.addEventListener('click', handleBoxClick));
resetBtn.addEventListener('click', resetGame);
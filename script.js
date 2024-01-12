const tiles = document.querySelectorAll('.tile');
const displayPlayer = document.querySelector('.display-player');
const announcer = document.querySelector('.announcer');
const newGameBtn = document.getElementById('newGamebtn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return null;
}

function checkTie() {
    return gameBoard.every(tile => tile !== '');
}

function updateDisplay() {
    displayPlayer.textContent = `Player ${currentPlayer}'s Turn`;
}

function handleTileClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        tiles[index].textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            announcer.textContent = `Player ${winner} Wins!`;
            announcer.classList.remove('hide');
        } else if (checkTie()) {
            gameActive = false;
            announcer.textContent = 'It\'s a Tie!';
            announcer.classList.remove('hide');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateDisplay();
        }
    }
}

function startNewGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    updateDisplay();
    announcer.textContent = '';
    announcer.classList.add('hide');

    tiles.forEach((tile, index) => {
        tile.textContent = '';
        tile.addEventListener('click', () => handleTileClick(index));
    });
}

newGameBtn.addEventListener('click', startNewGame);

startNewGame();

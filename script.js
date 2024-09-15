const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('#gameMessage'); // Use #gameMessage for message display
const restartBtn = document.querySelector('#restartBtn');
const modeSelect = document.querySelector('#modeSelect'); // Mode select dropdown

let currentPlayer = 'X'; // Start with 'X'
let boardState = Array(9).fill(null); // Initialize board state
let gameActive = true; // Flag to check if the game is active
let isSinglePlayer = false; // Track if the game is in single-player mode

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Add event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', restartGame);
modeSelect.addEventListener('change', (e) => {
    isSinglePlayer = e.target.value === 'single';
    restartGame(); // Restart game when mode changes
});

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    // Prevent interaction if cell is already occupied or game is not active
    if (boardState[cellIndex] !== null || !gameActive || (currentPlayer === 'O' && isSinglePlayer)) {
        return;
    }

    // Set the cell content and board state
    boardState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check for a win or draw
    if (checkWin()) {
        displayMessage(`${currentPlayer} Wins!`);
        gameActive = false;
        highlightWinnerCells();
    } else if (boardState.every(cell => cell !== null)) {
        displayMessage('It\'s a Draw!');
        gameActive = false;
    } else {
        // Toggle player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        
        if (currentPlayer === 'O' && isSinglePlayer) {
            setTimeout(computerMove, 500); // Delay for computer move
        }
    }

    // Add click animation
    event.target.classList.add('clicked');
    setTimeout(() => {
        event.target.classList.remove('clicked');
    }, 300); // Remove class after 300ms
}

function computerMove() {
    if (!gameActive) return;

    // Find available cells
    const availableCells = boardState
        .map((cell, index) => cell === null ? index : null)
        .filter(index => index !== null);

    if (availableCells.length === 0) return;

    // Make a random move
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    boardState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';

    // Check for a win or draw
    if (checkWin()) {
        displayMessage('O Wins!');
        gameActive = false;
        highlightWinnerCells();
    } else if (boardState.every(cell => cell !== null)) {
        displayMessage('It\'s a Draw!');
        gameActive = false;
    } else {
        currentPlayer = 'X'; // Switch back to player
    }
}

function checkWin() {
    return winningCombinations.some(combination => 
        combination.every(index => boardState[index] === currentPlayer)
    );
}

function highlightWinnerCells() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => boardState[index] === currentPlayer)) {
            combination.forEach(index => {
                cells[index].classList.add('winner');
            });
        }
    });
}

function restartGame() {
    currentPlayer = 'X'; // Reset to 'X'
    boardState = Array(9).fill(null); // Clear board state
    gameActive = true; // Restart the game
    cells.forEach(cell => {
        cell.textContent = ''; // Clear cell text
        cell.classList.remove('winner'); // Remove winner highlight
    });
    displayMessage(''); // Clear message
}

// Function to display the message
function displayMessage(messageText) {
    message.textContent = messageText;
}

const gameBoard = document.getElementById("game-board");
const cells = document.querySelectorAll(".cell");
const turnIndicator = document.getElementById("turn-indicator");
const resultMessage = document.getElementById("result-message");
const resetButton = document.getElementById("reset-button");

let currentPlayer = "X";
let boardState = Array(9).fill(null);
let gameActive = true;

// Winning combinations
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

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.dataset.index;

    if (!gameActive || boardState[cellIndex]) return;

    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin()) {
        gameActive = false;
        resultMessage.textContent = `Player ${currentPlayer} Wins!`;
        resultMessage.classList.add("show");
        highlightWinningCells();
        return;
    }

    if (boardState.every(cell => cell)) {
        gameActive = false;
        resultMessage.textContent = "It's a Draw!";
        resultMessage.classList.add("show");
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for a win
function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            combination.forEach(index => cells[index].classList.add("win"));
            return true;
        }
        return false;
    });
}

// Highlight winning cells
function highlightWinningCells() {
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            combination.forEach(index => cells[index].classList.add("win"));
        }
    });
}

// Reset game
function resetGame() {
    boardState.fill(null);
    gameActive = true;
    currentPlayer = "X";
    turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
    resultMessage.classList.remove("show");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken", "win");
    });
}

// Add event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

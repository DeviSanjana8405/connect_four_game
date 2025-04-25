document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resetBtn = document.getElementById('reset-btn');
    const ROWS = 6;
    const COLS = 7;
    let currentPlayer = 'red';
    let gameBoard = [];

    // Initialize game board
    function initializeBoard() {
        for (let i = 0; i < ROWS; i++) {
            gameBoard[i] = [];
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < COLS; j++) {
                gameBoard[i][j] = null;
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    }

    // Check for a win
    function checkWin(row, col) {
        const directions = [[-1, 0], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 1]];
        for (const [dx, dy] of directions) {
            let count = 1;
            let r = row + dx;
            let c = col + dy;
            while (r >= 0 && r < ROWS && c >= 0 && c < COLS && gameBoard[r][c] === currentPlayer) {
                count++;
                r += dx;
                c += dy;
            }
            r = row - dx;
            c = col - dy;
            while (r >= 0 && r < ROWS && c >= 0 && c < COLS && gameBoard[r][c] === currentPlayer) {
                count++;
                r -= dx;
                c -= dy;
            }
            if (count >= 4) return true;
        }
        return false;
    }

    // Handle player move
    function handleMove(cell) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        if (gameBoard[row][col] === null) {
            let currentRow = ROWS - 1;
            while (currentRow >= 0 && gameBoard[currentRow][col] !== null) {
                currentRow--;
            }
            if (currentRow >= 0) {
                cell = board.querySelector(`[data-row="${currentRow}"][data-col="${col}"]`);
                cell.style.backgroundColor = currentPlayer;
                gameBoard[currentRow][col] = currentPlayer;
                if (checkWin(currentRow, col)) {
                    alert(`${currentPlayer.toUpperCase()} wins!`);
                    resetGame();
                    return;
                }
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            }
        }
    }

    // Reset game
    function resetGame() {
        board.innerHTML = '';
        initializeBoard();
        currentPlayer = 'red';
    }

    // Event listener for cell clicks
    board.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell')) {
            handleMove(e.target);
        }
    });

    // Event listener for reset button click
    resetBtn.addEventListener('click', resetGame);

    // Initialize game
    initializeBoard();
});

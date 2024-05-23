const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
const messageElement = document.getElementById('message');

let isXTurn = true;
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleClick = (e) => {
    const cell = e.target;
    if (cell.classList.contains('x') || cell.classList.contains('o') || !gameActive) {
        return;
    }
    const currentClass = isXTurn ? 'x' : 'o';
    cell.classList.add(currentClass);
    if (checkWin(currentClass)) {
        gameActive = false;
        messageElement.textContent = `${currentClass.toUpperCase()} Wins!`;
    } else if (isDraw()) {
        gameActive = false;
        messageElement.textContent = 'Draw!';
    } else {
        isXTurn = !isXTurn;
    }
};

const checkWin = (currentClass) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
};

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
};

const restartGame = () => {
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
    });
    isXTurn = true;
    gameActive = true;
    messageElement.textContent = '';
};

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);

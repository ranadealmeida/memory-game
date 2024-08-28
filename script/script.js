let matchedPairs = 0;
const totalPairs = 16;

const squareSection = document.getElementById('squareSection');
const squares = Array.from(document.querySelectorAll('.square'));
const gameOverlay = document.getElementById('overlay');
const closeOverlay = document.getElementById('closeOverlay');
const playButton = document.getElementById('playButton');
const playAgain = document.getElementById('playAgainButton');
const winOverlay = document.getElementById('winOverlay');

function setupGame() {
    squares.sort(() => 0.5 - Math.random());
    squares.forEach(square => {
        squareSection.appendChild(square);
    });

    squares.forEach(square => {
        square.addEventListener('click', handleSquareClick);
    });
}

let firstSquare = null;
let secondSquare = null;
let lockBoard = false;

function handleSquareClick(e) {
    if (lockBoard) return;
    const clickedSquare = e.currentTarget;

    if (clickedSquare === firstSquare) return;

    clickedSquare.classList.add('flipped');

    if (!firstSquare) {
        firstSquare = clickedSquare;
    } else {
        secondSquare = clickedSquare;
        checkforMatch();
    }
}

function checkforMatch() {
    const isMatch = firstSquare.dataset.choice === secondSquare.dataset.choice;

    if (isMatch) {
        disableSquare();
        matchedPairs++;
        if (matchedPairs === totalPairs) {
            showWinOverlay();
        }
    } else {
        unflipSquares();
    }
}

function disableSquare() {
    firstSquare.removeEventListener('click', handleSquareClick);
    secondSquare.removeEventListener('click', handleSquareClick);
    resetBoard();
}

function unflipSquares() {
    lockBoard = true;
    setTimeout(() => {
        firstSquare.classList.remove('flipped');
        secondSquare.classList.remove('flipped');
        resetBoard();
    }, 700);
}

function resetBoard() {
    [firstSquare, secondSquare] = [null, null];
    lockBoard = false;
}

playButton.addEventListener('click', setupGame);

playButton.addEventListener('click', function () {
    gameOverlay.style.display = 'flex';
});

closeOverlay.addEventListener('click', () => {
    const confirmClose = confirm("Are you sure you want to close it? You will lose all your progress!");
    if (confirmClose) {
        gameOverlay.style.display = 'none';
        resetGame();
    }
});

function showWinOverlay() {
    winOverlay.style.display = 'flex';
}

playAgain.addEventListener('click', function () {
    winOverlay.style.display = 'none';
    matchedPairs = 0;
    resetGame();
    setupGame();
});

function resetGame() {
    matchedPairs = 0;
    squares.forEach(square => {
        square.classList.remove('flipped');
        square.addEventListener('click', handleSquareClick);
    });
    setupGame();
}
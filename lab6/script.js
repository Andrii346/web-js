const boardElement = document.getElementById('board');
const moveDisplay = document.getElementById('move-count');
const timerDisplay = document.getElementById('timer');
const winMessage = document.getElementById('win-message');

let moves = 0;
let gameState = [];
let lastClicked = null; 
let startTime;
let timerInterval;


function initBoard() {
    boardElement.innerHTML = '';
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${r}-${c}`;
            cell.onclick = () => handleMove(r, c);
            boardElement.appendChild(cell);
        }
    }
}

function handleMove(r, c) {
    
    if (lastClicked && lastClicked.r === r && lastClicked.c === c) {
        toggleLights(r, c);
        moves--;
        lastClicked = null; 
    } else {
        toggleLights(r, c);
        moves++;
        lastClicked = {r, c}; 
    }
    
    updateUI();
    checkWin();
}

function toggleLights(r, c) {
    const targets = [[r,c], [r-1,c], [r+1,c], [r,c-1], [r,c+1]];
    targets.forEach(([row, col]) => {
        if (row >= 0 && row < 5 && col >= 0 && col < 5) {
            gameState[row][col] = 1 - gameState[row][col];
        }
    });
}

function updateUI() {
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const cell = document.getElementById(`cell-${r}-${c}`);
            cell.className = 'cell ' + (gameState[r][c] === 1 ? 'on' : 'off');
        }
    }
    moveDisplay.innerText = moves;
}


async function solveGame() {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 5; c++) {
            if (gameState[r][c] === 1) {
                await new Promise(res => setTimeout(res, 200)); 
                handleMove(r + 1, c);
            }
        }
    }

    
    const bottomRow = gameState[4].join('');
    const patterns = {
        '10001': [0, 1], 
        '01010': [0, 3],
        '11100': [1],
        '00111': [3],
        '10110': [4],
        '01101': [0],
        '11011': [2]
    };

    if (patterns[bottomRow]) {
        patterns[bottomRow].forEach(col => handleMove(0, col));
        await solveGame(); 
    }
}

function startTimer() {
    clearInterval(timerInterval);
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const diff = Math.floor((Date.now() - startTime) / 1000);
        const m = String(Math.floor(diff / 60)).padStart(2, '0');
        const s = String(diff % 60).padStart(2, '0');
        timerDisplay.innerText = `${m}:${s}`;
    }, 1000);
}

let allLevels = {}; 


async function fetchLevels() {
    try {
        const response = await fetch('./levels.json'); 
        if (!response.ok) throw new Error("Не вдалося завантажити JSON");
        allLevels = await response.json(); 
        loadLevel('a');
    } catch (error) {
        console.error("Помилка AJAX:", error);
        winMessage.innerText = "Помилка завантаження даних!";
    }
}


function loadLevel(key) {
    if (!allLevels[key]) return;

    
    gameState = allLevels[key].map(row => [...row]);
    
    moves = 0;
    lastClicked = null;
    winMessage.innerText = '';
    updateUI();
    startTimer();
}


initBoard();
fetchLevels();

function checkWin() {
    if (gameState.flat().every(v => v === 0)) {
        clearInterval(timerInterval);
        winMessage.innerText = "ГОТОВО!";
    }
}

initBoard();
loadLevel('a');
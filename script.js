'use strict';

// Initial values
const tempScores = {
    player1: 0,
    player2: 0,
    reset: function () {
        this.player1 = 0;
        this.player2 = 0;
    },
};
const mainScores = {
    player1: 0,
    player2: 0,
    reset: function () {
        this.player1 = 0;
        this.player2 = 0;
    },
};
let isPlayerOne = true;

// Selecting main elements
const tempScoresDOM = {
    player1: document.querySelector('#temp-score-1'),
    player2: document.querySelector('#temp-score-2'),
    reset: function () {
        this.player1.textContent = 0;
        this.player2.textContent = 0;
    },
};
const mainScoresDOM = {
    player1: document.querySelector('#main-score-1'),
    player2: document.querySelector('#main-score-2'),
    reset: function () {
        this.player1.textContent = 0;
        this.player2.textContent = 0;
    },
};
const playersDOM = {
    player1: document.querySelector('.player-1'),
    player2: document.querySelector('.player-2'),
    switch: function () {
        if (isPlayerOne) {
            this.reset();
        } else {
            this.player1.classList.remove('player-active');
            this.player2.classList.add('player-active');
        }
    },
    reset: function () {
        this.player1.classList.add('player-active');
        this.player2.classList.remove('player-active');
    },
};

const dice = document.querySelector('.dice');

// Selecting buttons
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

// Utility functions
const resetTempScores = () => {
    tempScores.reset();
    tempScoresDOM.reset();
};

const resetMainScores = () => {
    mainScores.reset();
    mainScoresDOM.reset();
};

const setTempScore = (score) => {
    const player = isPlayerOne ? 'player1' : 'player2';
    tempScores[player] += score;
    tempScoresDOM[player].textContent = tempScores[player];
};

const setMainScore = () => {
    const player = isPlayerOne ? 'player1' : 'player2';
    mainScores[player] += tempScores[player];
    mainScoresDOM[player].textContent = mainScores[player];

    checkWinner();
};

const checkWinner = () => {
    const player = isPlayerOne ? 'player1' : 'player2';
    if (mainScores[player] >= 100) {
        alert(`Player ${isPlayerOne ? 1 : 2} won!`);
        start();
    }
};

const switchPlayer = () => {
    isPlayerOne = !isPlayerOne;
    playersDOM.switch();
};

// Roll dice
btnRoll.addEventListener('click', () => {
    const diceNumber = Math.floor(Math.random() * 6) + 1;

    dice.classList.remove('hidden');
    dice.src = `assets/dice-${diceNumber}.png`;

    if (diceNumber === 1) {
        const player = isPlayerOne ? 'player1' : 'player2';
        tempScores[player] = 0;
        tempScoresDOM[player].textContent = 0;
        switchPlayer();
        return;
    }

    setTempScore(diceNumber);
});

// Hold score
btnHold.addEventListener('click', () => {
    setMainScore();
    resetTempScores();
    switchPlayer();
});

// Starting game
const start = () => {
    resetTempScores();
    resetMainScores();
    playersDOM.reset();
    dice.classList.add('hidden');
};

start();

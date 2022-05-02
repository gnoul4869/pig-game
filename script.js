'use strict';

// Initial values
let tempScore = 0;
let isPlayerOne = true;
let isPlaying = true;

// Player class
function Player(player) {
    // player is 1 or 2
    this.score = 0;
    this.playerDOM = document.querySelector(`.player-${player}`);
    this.tempScoreDOM = document.querySelector(`#temp-score-${player}`);
    this.scoreDOM = document.querySelector(`#score-${player}`);
    this.setTempScore = function (score) {
        this.tempScoreDOM.textContent = score;
    };
    this.addScore = function () {
        this.score += tempScore;
        this.scoreDOM.textContent = this.score;
    };
    this.activate = function () {
        this.playerDOM.classList.add('player-active');
    };
    this.disable = function () {
        this.playerDOM.classList.remove('player-active');
    };
    this.reset = function () {
        this.score = 0;
        this.tempScoreDOM.textContent = 0;
        this.scoreDOM.textContent = 0;
    };
}

// Create players
const players = {
    player1: new Player(1),
    player2: new Player(2),
};

// Selecting DOM elements
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const announcement = document.querySelector('.announcement');

// Utility functions
const switchPlayers = () => {
    let currentPlayer = isPlayerOne ? players.player1 : players.player2;
    let nextPlayer = isPlayerOne ? players.player2 : players.player1;
    currentPlayer.disable();
    currentPlayer.setTempScore(0);
    nextPlayer.activate();
    isPlayerOne = !isPlayerOne;
};

const getWinner = () => {
    let winner = null;
    if (players.player1.score >= 100) {
        winner = players.player1;
    } else if (players.player2.score >= 100) {
        winner = players.player2;
    }
    return winner;
};

// End the game
const endGame = (winner) => {
    winner.playerDOM.classList.remove('player-active');
    winner.playerDOM.classList.add('player-winner');

    announcement.textContent = `Player ${isPlayerOne ? 1 : 2} wins! 🎉`;
    announcement.classList.remove('hidden');

    isPlaying = false;
};

// Start the game
const start = () => {
    tempScore = 0;
    players.player1.reset();
    players.player1.playerDOM.classList.add('player-active');
    players.player1.playerDOM.classList.remove('player-winner');
    players.player2.reset();
    players.player2.playerDOM.classList.remove('player-active');
    players.player2.playerDOM.classList.remove('player-winner');
    dice.classList.add('hidden');
    isPlayerOne = true;
    isPlaying = true;

    announcement.textContent = '🤡';
    announcement.classList.add('hidden');
};

// Roll dice
btnRoll.addEventListener('click', () => {
    if (!isPlaying) return;
    const diceNumber = Math.floor(Math.random() * 6) + 1;

    dice.classList.remove('hidden');
    dice.src = `assets/dice-${diceNumber}.png`;

    if (diceNumber === 1) {
        tempScore = 0;
        switchPlayers();
        return;
    }

    tempScore = tempScore + diceNumber;

    const player = isPlayerOne ? players.player1 : players.player2;
    player.setTempScore(tempScore);
});

// Hold score
btnHold.addEventListener('click', () => {
    const player = isPlayerOne ? players.player1 : players.player2;
    player.addScore(tempScore);
    tempScore = 0;

    const winner = getWinner();
    if (winner) {
        endGame(winner);
    } else {
        switchPlayers();
    }
});

// New game
btnNew.addEventListener('click', start);

// Starting...
start();

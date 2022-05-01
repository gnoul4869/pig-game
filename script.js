'use strict';

// Initial values
let score1 = 0;
let score2 = 0;
let isPlayerOne = true;

// Selecting main elements
const scoreD1 = document.querySelector('#score-1');
const scoreD2 = document.querySelector('#score-2');
const dice = document.querySelector('.dice');

// Selecting buttons
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

// Small functions
const setScore = (score) => {
    if (isPlayerOne) {
        score1 = score;
        scoreD1.textContent = score;
    } else {
        score2 = score;
        scoreD2.textContent = score;
    }
};

// Roll dice
btnRoll.addEventListener('click', () => {
    const diceNumber = Math.floor(Math.random() * 6) + 1;

    dice.classList.remove('hidden');
    dice.src = `assets/dice-${diceNumber}.png`;

    if (diceNumber === 1) {
        if (isPlayerOne) {
            setScore(0);
            isPlayerOne = false;
        } else {
            setScore(0);
            isPlayerOne = true;
        }
    }
});

// Starting game
const start = () => {
    scoreD1.textContent = 0;
    scoreD2.textContent = 0;
    dice.classList.add('hidden');
};

start();

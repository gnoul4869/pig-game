'use strict';

// Selecting elements
let scoreP0 = document.querySelector('#score-0');
let scoreP1 = document.querySelector('#score-1');

const start = () => {
    scoreP0.textContent = 0;
    scoreP1.textContent = 0;
};

start();

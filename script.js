'use strict';

//------------------------------
// Consts
//------------------------------
const EL_BUTTON_NEW = document.querySelector('.btn--new')
const EL_BUTTON_ROLL = document.querySelector('.btn--roll')
const EL_BUTTON_HOLD = document.querySelector('.btn--hold')
const EL_DICE = document.querySelector('.dice')

// Player 1
const EL_PLAYER_0 = document.querySelector('.player--0')
const EL_SCORE_0 = document.getElementById('score--0')
const EL_CURRENT_0 = document.getElementById('current--0')

// Player 2
const EL_PLAYER_1 = document.querySelector('.player--1')
const EL_SCORE_1 = document.getElementById('score--1')
const EL_CURRENT_1 = document.getElementById('current--1')

//------------------------------
// Vars
//------------------------------
let scores = {
    player0 : 0,
    player1 : 0
}
let currentScore = 0;
let activePlayer = 0;

//------------------------------
// Functions
//------------------------------
const hideGameControls = function () {
    EL_BUTTON_ROLL.classList.add('hidden')
    EL_BUTTON_HOLD.classList.add('hidden')
}

const showGameControls = function () {
    EL_BUTTON_ROLL.classList.remove('hidden')
    EL_BUTTON_HOLD.classList.remove('hidden')
}

const generateNumber = function () {
    // Generates a number (1 to 6)
    return Math.trunc(Math.random() * 6)  + 1
}

const hideDice = function () {
    EL_DICE.classList.add('hidden');
}

const showDice = function () {
    EL_DICE.classList.remove('hidden');
}

const showDiceRoll = function (dice) {
    if (dice >= 1 && dice <= 6) {
        EL_DICE.src = `dice-${dice}.png`
    }
}

const rollDice = function () {

    // generate number
    const dice = generateNumber()

    if (EL_DICE.classList.contains('hidden')) {
        showDice();
    }

    // display dice accordingly to number
    showDiceRoll(dice)

    //  Check if roll is 1, if true, switch player and 0 current score
    if (dice !== 1) {
        // Add dice to current score
        updateCurrentScore(dice);
    } else {
        // Switch to next player
        updateCurrentScore();
        switchPlayer()
    }
}

const switchPlayer = function (newGame = false) {

    if (!newGame) {
        activePlayer = activePlayer === 0 ? 1 : 0;
        EL_PLAYER_0.classList.toggle('player--active')
        EL_PLAYER_1.classList.toggle('player--active')
    }

    if (newGame) {
        activePlayer = 0;
        EL_PLAYER_0.classList.add('player--active');
        EL_PLAYER_1.classList.remove('player--active');
    }
}

const renderCurrentScore = function (value) {
    document.getElementById(`current--${activePlayer}`).textContent = value;
}

const updateCurrentScore = function (value = 0) {

    if (value) {
        currentScore += value;
    }

    if (value === 0) {
        currentScore = value;
    }

    renderCurrentScore(currentScore);
}

const renderPlayerScore = function (value) {
    document.getElementById(`score--${activePlayer}`).textContent = value;
}

const updatePlayerScore = function () {
    return scores[`player${activePlayer}`] += currentScore
}

const holdScore = function () {
    if (currentScore !== 0) {
        // Update the players score, re-render, reset current score, and switch player
        renderPlayerScore(updatePlayerScore());

        currentScore = 0;
        renderCurrentScore(currentScore);

        if (scores[`player${activePlayer}`] >= 100) {
            renderPlayerScore('Winner');
            hideGameControls();
            hideDice();
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        } else {
            switchPlayer()
        }
    }

}

const resetScores = function () {
    currentScore = 0;
    scores = {
        player0: 0,
        player1: 0
    };
    EL_CURRENT_0.textContent = 0;
    EL_SCORE_0.textContent = 0;
    EL_CURRENT_1.textContent = 0;
    EL_SCORE_1.textContent = 0;
}

const newGame = function () {
    switchPlayer(true);
    resetScores()
    hideDice();
    showGameControls();
    EL_PLAYER_0.classList.remove('player--winner')
    EL_PLAYER_1.classList.remove('player--winner')
}

newGame()

//------------------------------
// Event Listeners
//------------------------------
EL_BUTTON_ROLL.addEventListener('click', rollDice)
EL_BUTTON_HOLD.addEventListener('click', holdScore)
EL_BUTTON_NEW.addEventListener('click', newGame)
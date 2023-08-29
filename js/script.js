
import '../js/style.js';

const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const computerScoreSpanGlobal = document.querySelector('[data-computer-global-score]')

const yourScoreSpan = document.querySelector('[data-your-score]')
const yourScoreSpanGlobal = document.querySelector('[data-your-global-score]')


const game = document.querySelector('[data-game]')
const startGame = document.querySelector('[data-start]')
const resetGame = document.querySelector('[data-reset]')

const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌',
        beats: 'paper'
    }
]

let yourScore = 0;
let computerScore = 0;
let yourScoreGlobal = 0;
let computerScoreGlobal = 0;


startGame.addEventListener('click', () => {
    game.classList.remove('hide');
    startGame.classList.add('hide')
})

resetGame.onclick = reset;

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', () => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})


function makeSelection(selection) {
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)

    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)

    if (yourWinner) {
        yourScore += 1
        incrementScore(yourScoreSpan, yourScore)
        if (yourScore === 3) {
            yourScoreGlobal += 1
            yourScoreSpanGlobal.innerHTML = yourScoreGlobal
            yourScoreSpanGlobal.classList.add('winner')
            computerScoreSpanGlobal.classList.remove('winner')
            reset();
        }
    }
    if (computerWinner) {
        computerScore += 1
        incrementScore(computerScoreSpan, computerScore)
        if (computerScore === 3) {
            computerScoreGlobal += 1
            computerScoreSpanGlobal.innerHTML = computerScoreGlobal;
            computerScoreSpanGlobal.classList.add('winner')
            yourScoreSpanGlobal.classList.remove('winner')
            reset();
        }
    }
}

function incrementScore(scoreSpan, score) {
    scoreSpan.innerText = score;
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) {
        div.classList.add('winner')
    }
    finalColumn.after(div)
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}

function reset() {
    yourScore = 0;
    computerScore = 0;
    document.querySelectorAll('.result-selection').forEach(element => element.remove());
    incrementScore(yourScoreSpan, yourScore)
    incrementScore(computerScoreSpan, computerScore)


}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}
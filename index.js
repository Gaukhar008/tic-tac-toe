"use strict";

const gameBoardModule = (function() {
    const gameBoard = ['', '', '', 
                      '', '', '', 
                      '', '', ''];
    return {gameBoard};
})();

const displayControllerModule = (function() {
    const circleHTML = '<i class="fa-regular fa-circle"></i>';
    const crossHTML = '<i class="fa-solid fa-xmark"></i>';

    const gridBoxes = Array.from(document.querySelectorAll('.grid__box'));
    let turn = 'X';

    function renderArrayToScreen() {
        for (let i = 0; i < gameBoardModule.gameBoard.length; i++) {
            if(gameBoardModule.gameBoard[i] === 'X') {
                gridBoxes[i].innerHTML = crossHTML; 
            } else if(gameBoardModule.gameBoard[i] === 'O') {
                gridBoxes[i].innerHTML = circleHTML;
            }
        }
    };

    function handleTurn(event) {
        let idx = gridBoxes.findIndex(function(box) {
            return box === event.target;
        });
        turn = turn === 'X' ? 'O' : 'X';
        if(gameBoardModule.gameBoard[idx] === '') {
        gameBoardModule.gameBoard[idx] = turn; 
        };
        renderArrayToScreen();
        resetGameBoard();
        updateStatistics();
    };

    function resetGameBoard() {
        let win = gameController.getWinner();
        if(win !== null) {
            setTimeout(() => {
            gameController.updateGameBoard()
            gridBoxes.forEach(box => {
                box.innerHTML = '';
            })},
            500);
            gameController.round++;
        }
    }

    function updateStatistics() {
        const circleWins = document.querySelector('.score__item.circle').lastElementChild.querySelector('strong');
        const crossWins = document.querySelector('.score__item.cross').lastElementChild.querySelector('strong');
        const draws = document.querySelector('.score__item.draw').lastElementChild.querySelector('strong');

        let win = gameController.getWinner();
        if(win == 'X') {
            crossWins.textContent = (++gameController.playerX.wins).toString();
        } else if(win == 'O') {
            circleWins.textContent = (++gameController.playerO.wins).toString();
        } else if( win == 'Tie') {
            draws.textContent = (++gameController.ties).toString();
        }
    }
    

    return {handleTurn, updateStatistics};
})();

const Player = (assignedXO) => {
    let wins = 0;
    this.assignedXO = assignedXO;
    const getPlayerAssignedXO = function() {
        return assignedXO;
    };
    return {getPlayerAssignedXO , wins};
}

const gameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let ties = 0;
    let round = 0;

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

    function getWinner() {
        let winner = null;
        winningCombinations.forEach(function(combo) {
            if(gameBoardModule.gameBoard[combo[0]] && gameBoardModule.gameBoard[combo[0]]  == gameBoardModule.gameBoard[combo[1]] &&
               gameBoardModule.gameBoard[combo[0]] == gameBoardModule.gameBoard[combo[2]]) {
               winner = gameBoardModule.gameBoard[combo[0]];  
            };
        });
        if(winner) {
            return winner;
        } else if(gameBoardModule.gameBoard.includes('')) {
            return null;
        } else {
            return 'Tie';
        }
    };

    function updateGameBoard() {
        for(let i = 0; i < gameBoardModule.gameBoard.length; i++) {
            gameBoardModule.gameBoard[i] = '';

        };
    };

    return {getWinner, updateGameBoard, round, playerX, playerO, ties};
})();

document.querySelector('.grid').addEventListener('click', displayControllerModule.handleTurn);

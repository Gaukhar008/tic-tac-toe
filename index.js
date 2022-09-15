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

        let win = gameController.getWinner();
        renderArrayToScreen();
        if(win !== null) {
            setTimeout(() => {
            gameController.updateGameBoard()
            gridBoxes.forEach(box => {
                box.innerHTML = '';
            })},
            500);
        }
    };
    

    return {handleTurn};
})();

const Player = (assignedXO) => {
    this.assignedXO = assignedXO;
    const getPlayerAssignedXO = function() {
        return assignedXO;
    };
    return {assignedXO};
}

const gameController = (() => {
    const playerX = 'X';
    const playerO = 'O';
    let round = 1;

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
        if(winner !== null) {
            round++;
        }
        console.log(winner);
        return winner;
    };

    function updateGameBoard() {
        for(let i = 0; i < gameBoardModule.gameBoard.length; i++) {
            gameBoardModule.gameBoard[i] = '';

        };
    };

    return {getWinner, updateGameBoard, round};
})();

document.querySelector('.grid').addEventListener('click', displayControllerModule.handleTurn);

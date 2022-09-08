const gameBoardModule = (function() {
    const gameBoard = ['X', 'O', 'X', 'X', 'X'];
    return {gameBoard};
})();

const displayController = (function() {
    const gridBoxes = document.querySelectorAll('.grid__box');
    

    function renderArrayToScreenModule() {
        for (let i = 0; i < gridBoxes.length; i++) {
            gridBoxes[i].textContent = gameBoardModule.gameBoard[i];
        }
    };

    return {};
})();

const createPlayer = (playerName, playerNumber, assignedXO) => {
    const getPlayerName = () => {
        console.log('This is the name of player ' + playerNumber + '.....' + playerName);
    }
    return {getPlayerName, playerName, playerNumber, assignedXO};
}

let Justin = createPlayer('Justin', 1, 'X');
let James = createPlayer('James', 2, 'O');



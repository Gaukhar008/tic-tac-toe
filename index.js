const gameBoardModule = (function() {
    const gameBoard = ['', '', '', 
                      '', '', '', 
                      '', '', ''];
    return {gameBoard};
})();

const displayControllerModule = (function() {
    const gridBoxes = Array.from(document.querySelectorAll('.grid__box'));
    let turn = 'X';

    function renderArrayToScreen() {
        for (let i = 0; i < gameBoardModule.gameBoard.length; i++) {
            gridBoxes[i].textContent = gameBoardModule.gameBoard[i];
        }
    };

    function handleTurn(event) {
        let idx = gridBoxes.findIndex(function(box) {
            return box === event.target;
        });
        gameBoardModule.gameBoard[idx] = turn; 
        renderArrayToScreen();
    };
    

    return {renderArrayToScreen, handleTurn};
})();

const createPlayer = (playerName, playerNumber, assignedXO) => {
    const getPlayerName = () => {
        console.log('This is the name of player ' + playerNumber + '.....' + playerName);
    }
    return {getPlayerName, playerName, playerNumber, assignedXO};
}

let Justin = createPlayer('Justin', 1, 'X');
let James = createPlayer('James', 2, 'O');

document.querySelector('.grid').addEventListener('click', displayControllerModule.handleTurn);
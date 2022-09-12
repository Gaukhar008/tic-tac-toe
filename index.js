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
    };
    

    return {handleTurn};
})();

const createPlayer = (playerName, playerNumber, assignedXO) => {
    const getPlayerName = () => {
        console.log('This is the name of player ' + playerNumber + '.....' + playerName);
    }
    const getPlayerMark = function() {
        return this.assignedXO;
    };
    return {getPlayerName, getPlayerMark, playerName, playerNumber, assignedXO};
}

let Justin = createPlayer('Justin', 1, 'X');
let James = createPlayer('James', 2, 'O');

document.querySelector('.grid').addEventListener('click', displayControllerModule.handleTurn);

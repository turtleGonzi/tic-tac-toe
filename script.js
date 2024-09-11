const container = document.querySelector('.container');
const title = document.querySelector('.title');
const displayBoard = document.querySelector('.board');
const text = document.querySelector('.text');
const score = document.querySelector('.score');
const input = document.querySelector('input');




function box(className){
    const box = document.createElement('div');
    box.style.flex = '1 1 auto';
    box.style.margin = 'auto';
    box.style.width = '150px';
    box.style.height = '150px';
    box.style.backgroundColor = 'pink';
    box.style.border = '2px solid black';
    box.className = `${className}`;
    // box.addEventListener('click', () => {
    //     box.textContent = 'fsdfs';
    // })
    displayBoard.appendChild(box);
    return box;
}

container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.alignItems = 'center';
title.style.width = '400px';
title.style.margin = 'auto;'
title.style.fontSize = '3rem';
title.style.textAlign = 'center';
title.style.fontWeight = 'bold';
displayBoard.style.display = 'flex';
displayBoard.style.flexWrap = 'wrap';
displayBoard.style.width = '30%';
displayBoard.style.margin = 'auto';
text.style.width = '400px';
text.style.margin = 'auto;'
text.style.fontSize = '3rem';
text.style.textAlign = 'center';
text.style.fontWeight = 'bold';
score.style.width = '400px';
score.style.margin = 'auto;'
score.style.fontSize = '3rem';
score.style.textAlign = 'center';
score.style.fontWeight = 'bold';
input.style.borderRadius = '3px';
input.style.width = '100px';
input.style.height = '33px';
input.style.fontSize = '1.5rem';

const boxes = [];
for(let i = 1; i <= 9; i++){
    boxes.push(box(`box${i}`));
}
boxes.forEach(box =>{
    box.style.fontWeight = 'bold';
    box.style.fontSize = '160px';
    box.style.margin = 'auto';
    box.style.textAlign = 'center';
    box.style.lineHeight = '1';
})


const gameboard = (function () {
    let board = [
    [`${boxes[0].textContent}`,`${boxes[1].textContent}`,`${boxes[2].textContent}`],
    [`${boxes[3].textContent}`,`${boxes[4].textContent}`,`${boxes[5].textContent}`],
    [`${boxes[6].textContent}`,`${boxes[7].textContent}`,`${boxes[8].textContent}`]
    ];

    const checkWinner = (player) => {
        if((board[0].toString() == `${player.marker},${player.marker},${player.marker}`) ||
        (board[1].toString() == `${player.marker},${player.marker},${player.marker}`) ||
        (board[2].toString() == `${player.marker},${player.marker},${player.marker}`) ||
        (board[0][0] == player.marker && board[1][1] == player.marker  && board[2][2] == player.marker) ||
        (board[0][0] == player.marker && board[1][0] == player.marker  && board[2][0] == player.marker) ||
        (board[0][1] == player.marker && board[1][1] == player.marker  && board[2][1] == player.marker) ||
        (board[0][2] == player.marker && board[1][2] == player.marker  && board[2][2] == player.marker)
    ){
            alert(`${player.name} WIN`);
            resetBoard()
            player.addPoint()
            gameFlow.displayPoints();
            gameFlow.gameRound++;
        } else if (board.toString().replaceAll(',','').length === 9){
            alert('TIE');
            resetBoard()
            gameFlow.gameRound++;
        }
    }

    const updateBoard = () => {
        board = [
            [`${boxes[0].textContent}`,`${boxes[1].textContent}`,`${boxes[2].textContent}`],
            [`${boxes[3].textContent}`,`${boxes[4].textContent}`,`${boxes[5].textContent}`],
            [`${boxes[6].textContent}`,`${boxes[7].textContent}`,`${boxes[8].textContent}`]
            ];
    }

    const resetBoard = () => {
        boxes.forEach(box => {
            box.textContent = '';
            updateBoard();
        });
    }

    const btnResetBoard = () => {
        input.addEventListener("click", () => {
            resetBoard();
            player1.resetPoints();
            player2.resetPoints();
            gameFlow.displayPoints();
        })
    }

    return {checkWinner, updateBoard, resetBoard, btnResetBoard}
})();

function createPlayer(name, marker) {
    name;
    marker;
    let playerPoints = 0;
    const addPoint = () => {
        playerPoints++;
    }
    const showPoints = () => {
        return playerPoints;
    }
    const resetPoints = () => {
        playerPoints = 0;
    }

    return {name, marker, addPoint, showPoints, resetPoints}
}

const gameFlow =( () => {
    const roundTxt = (player) => {
        text.textContent = `Turn: ${player.name}`;
    }
    let gameRound = 1;
    const playerMove = (playerA, playerB) => {
        let playerToggle = (gameRound % 2);
        boxes.forEach(element =>{
            element.addEventListener('click', () => {
                if(element.textContent == ''){
                if(playerToggle){
                    element.textContent = playerA.marker; 
                    gameboard.updateBoard();
                    gameboard.checkWinner(playerA);
                    roundTxt(playerB);
                    playerToggle = !playerToggle;
                } else {
                    element.textContent = playerB.marker; 
                    gameboard.updateBoard();
                    gameboard.checkWinner(playerB);
                    roundTxt(playerA);
                    playerToggle = !playerToggle;
                }
            }
            })
        })
    }
    const displayPoints = () => {
        score.textContent = `${player1.name}: ${player1.showPoints()}|${player2.name}: ${player2.showPoints()}`;
    }
    const setName = (num) => {
        return prompt(`Zadej jmeno hrace ${num}`);
    }
    return {roundTxt, playerMove, displayPoints, setName, gameRound}
})()

const player1 = createPlayer(gameFlow.setName(1), 'X');
const player2 = createPlayer(gameFlow.setName(2), 'O');

function game () {
        gameFlow.playerMove(player1,player2);
        gameFlow.roundTxt(player1);
        gameFlow.displayPoints();
        gameboard.btnResetBoard();
}


game();







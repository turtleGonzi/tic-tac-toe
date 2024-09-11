const container = document.querySelector('.container');
const title = document.querySelector('.title');
const displayBoard = document.querySelector('.board');
const text = document.querySelector('.text');
const score = document.querySelector('.score');



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
        } else if (board.toString().replaceAll(',','').length === 9){
            alert('TIE');
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

    return {checkWinner, updateBoard}
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
    return {name, marker, addPoint, showPoints}
}


const player1 = createPlayer('X', 'X');
const player2 = createPlayer('O', 'O');

function game () {
        gameFlow.playerMove(player1,player2);
        gameFlow.roundTxt(player1);
}

const gameFlow =( () => {
    const roundTxt = (player) => {
        text.textContent = `Turn: ${player.name}`;
    }
    let playerToggle = true;
    const playerMove = (playerA, playerB) => {
        boxes.forEach(element =>{
            element.addEventListener('click', () => {
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
                    roundTxt(playerA)
                    playerToggle = !playerToggle;
                }
            })
        })
    }
    return {roundTxt, playerMove}
})()



game();







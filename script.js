const gameboard = (function () {
    board = [
    ['','',''],
    ['','',''],
    ['','','']];
    const showBoard = () => {
        board.forEach(element => {
            console.log(element);
        });
    }
    const updateBoard = (x,y,marker) => {
        board[x][y] = marker;
    }
    const checkWinner = (player) => {
        if((board[0].toString() == `${player.marker},${player.marker},${player.marker}`) ||
        (board[1].toString() == `${player.marker},${player.marker},${player.marker}`) ||
        (board[2].toString() == `${player.marker},${player.marker},${player.marker}`) ||
        (board[0][0] == player.marker && board[1][1] == player.marker  && board[2][2] == player.marker) ||
        (board[2][0] == player.marker && board[1][1] == player.marker  && board[0][2] == player.marker) ){
            alert(`${player.name} WIN`);
            resetBoard()
            player.addPoint()
        } else if (board.toString().replaceAll(',','').length === 9){
            alert('TIE');
        }
    }

    const resetBoard = () => {
        board = [
            ['','',''],
            ['','',''],
            ['','','']];
    }

    return {showBoard, updateBoard, checkWinner}
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
    const playerMove = () => {
        const x = prompt('Zadej osu x');
        const y = prompt('Zadej osu y');
        if(board[x][y] !== '') {
            alert('Chybne zadani');
            return playerMove();
        }
        gameboard.updateBoard(x,y,marker);
    }
    return {name, marker, addPoint, showPoints, playerMove}
}


const player1 = createPlayer('Eric', 'X');
const player2 = createPlayer('Kyle', 'O');

function game () {
    while(true){
        gameFlow.round(player1);
        gameFlow.round(player2);
    }
}

const gameFlow =( () => {
    const round = (player) => {
        player.playerMove();
        console.clear();
        gameboard.showBoard();
        gameboard.checkWinner(player)
    }
    return {round}
})()



game();

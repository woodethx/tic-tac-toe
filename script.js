function Gameboard(){
    const board = [];

    function newBoard(){
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell());
        }
    }
    }
    newBoard();

    function placeSymbol(row, column, symbol){
        board[row][column].setSymbol(symbol);
    }

    const printBoard = function(){
        const printedBoard = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(printedBoard);
    }

    const getBoard = () => board;

    return{
        printBoard,
        placeSymbol,
        getBoard,
        newBoard
    }

}

function Cell(){
    let value = "";
    const getValue = () => value;

    const setSymbol = function (symbol){
        value = symbol;
    };

    return{
        getValue,
        setSymbol
    };
}

function GameController(){
    const board = Gameboard();

    const players = [
        {
            name: "Player One",
            symbol: "X"
        },
        {
            name: "Player Two",
            symbol: "O"
        }
    ];

    let activePlayer = players[0];

    const switchTurn = () => activePlayer = activePlayer == players[0] ? players[1] : players[0];
    
    const matchThree = (a,b,c) => a == b && b == c;

    const getSymbol = (row, column) => board.getBoard()[row][column].getValue();

    let endMessage = "";

    const endGame = () => {
        board.newBoard();
        endMessage = activePlayer.name+" wins!"
        activePlayer = players[1];
    }
    const tieGame = () => {
        board.newBoard();
        endMessage = "It's a tie!"
        activePlayer = players[1];
    }

    const winCon = () => {
        if(matchThree(getSymbol(0,0),getSymbol(0,1),getSymbol(0,2)) && getSymbol(0,0)){
            endGame();
        }
        if(matchThree(getSymbol(1,0),getSymbol(1,1),getSymbol(1,2)) && getSymbol(1,0)){
            endGame();
        }
        if(matchThree(getSymbol(2,0),getSymbol(2,1),getSymbol(2,2)) && getSymbol(2,0)){
            endGame();
        }
        if(matchThree(getSymbol(0,0),getSymbol(1,0),getSymbol(2,0)) && getSymbol(0,0)){
            endGame();
        }
        if(matchThree(getSymbol(0,1),getSymbol(1,1),getSymbol(2,1)) && getSymbol(0,1)){
            endGame();
        }
        if(matchThree(getSymbol(0,2),getSymbol(1,2),getSymbol(2,2)) && getSymbol(0,2)){
            endGame();
        }
        if(matchThree(getSymbol(0,0),getSymbol(1,1),getSymbol(2,2)) && getSymbol(0,0)){
            endGame();
        }
        if(matchThree(getSymbol(0,2),getSymbol(1,1),getSymbol(2,0)) && getSymbol(0,2)){
            endGame();
        }
        let allFilled = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(!getSymbol(i,j)) allFilled = false;
            }
        }
        if(allFilled){
            tieGame();
        }
        
    }

    const getEnd = () => endMessage;
    const setEnd = (end) => endMessage = end;

    const playRound = (row,column) => {
        if(getSymbol(row,column)) return;
        console.log(activePlayer.name+" places an "+activePlayer.symbol);
        board.placeSymbol(row,column,activePlayer.symbol);
        board.printBoard();
        winCon();
        switchTurn();
    }
    const getPlayer = () => activePlayer;
    return{
        playRound,
        getBoard: board.getBoard,
        getPlayer,
        getEnd,
        setEnd
    }
}


function ScreenController(){
    const game = GameController();

    function playEvent(e){
        const row = e.target.dataset.row;
        const column = e.target.dataset.column;
        game.playRound(row,column);
        updateScreen();
    }

    const updateScreen = () => {
        const board = game.getBoard();
        const boardDiv = document.querySelector(".board");
        const info = document.querySelector(".info");

        info.innerHTML = game.getEnd() ? game.getEnd()+"</br>"+game.getPlayer().name+"'s turn" : game.getPlayer().name+"'s turn";
        if (game.getEnd) {
            game.setEnd("");
        }

        boardDiv.innerText = "";

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
            const cell =  document.createElement("button");
            cell.classList.add("cell")
            boardDiv.appendChild(cell);
            cell.dataset.row = i;
            cell.dataset.column = j;
            cell.textContent = board[i][j].getValue();
            cell.addEventListener("click", playEvent);
            }
        }

    }
    updateScreen();

    
}

const game = ScreenController();



const cells = document.querySelectorAll(".cell");
const moves = document.querySelectorAll(".move");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const historyBtn = document.querySelector(".historyBtn");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const moveList = document.querySelector(".moveList");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let state = ["", "", "", "", "", "", "", "", ""];
let history = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let currentCell = "";
let running = false;
let moveCount = 0;
let maxMoves = 0;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(state[cellIndex] != "" || !running){
        return;
    }

    if (cellIndex == "0"){
        currentCell = "TOP LEFT";
    } else if (cellIndex == 1){
        currentCell = "TOP CENTER";
    } else if (cellIndex == 2){
        currentCell = "TOP RIGHT";
    } else if (cellIndex == 3){
        currentCell = "MID LEFT";
    } else if (cellIndex == 4){
        currentCell = "MID CENTER";
    } else if (cellIndex == 5){
        currentCell = "MID RIGHT";
    } else if (cellIndex == 6){
        currentCell = "BOTTOM LEFT";
    } else if (cellIndex == 7){
        currentCell = "BOTTOM CENTER";
    } else if (cellIndex == 8){
        currentCell = "BOTTOM RIGHT";
    }

    document.querySelector(`.move${moveCount}`).textContent = `${moveCount+1}: PLAYER ${currentPlayer} MARKED THE ${currentCell}`;    
    updateCell(this, cellIndex);
    checkWinner();

    
}

function changeHistory(){    
    history[moveCount]=JSON.parse(JSON.stringify(state));
    console.log(history[moveCount]);
    console.log(history);
    moveCount=moveCount+1;
    
}

function updateCell(cell, index){
    state[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = state[condition[0]];
        const cellB = state[condition[1]];
        const cellC = state[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
        document.querySelector(".prevBtn").classList.remove("hidden");
        document.querySelector(".nextBtn").classList.remove("hidden");
        document.querySelector(".historyBtn").classList.remove("hidden");
        changeHistory()
        historyBtn.addEventListener("click", showHistory);
        prevBtn.addEventListener("click", showPrev);
        nextBtn.addEventListener("click", showNext);
        moveCount = moveCount - 1;
        maxMoves = JSON.parse(JSON.stringify(moveCount));
    }
    else if(!state.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
        document.querySelector(".prevBtn").classList.remove("hidden");
        document.querySelector(".nextBtn").classList.remove("hidden");
        document.querySelector(".historyBtn").classList.remove("hidden");
        changeHistory()
        historyBtn.addEventListener("click", showHistory);
        historyBtn.addEventListener("click", showHistory);
        prevBtn.addEventListener("click", showPrev);
        nextBtn.addEventListener("click", showNext);
        moveCount = moveCount - 1;
        maxMoves = JSON.parse(JSON.stringify(moveCount));
    }
    else{
        changePlayer();
        changeHistory();
    }
}

function restartGame(){
    currentPlayer = "X";
    state = ["", "", "", "", "", "", "", "", ""];
    history = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    moveCount = 0;
    document.querySelector(".prevBtn").classList.add("hidden");
    document.querySelector(".nextBtn").classList.add("hidden");
    document.querySelector(".historyBtn").classList.add("hidden");
    document.querySelector(".wrapper").classList.add("hidden");
    
    document.querySelector(".move0").textContent = "";
    document.querySelector(".move1").textContent = "";
    document.querySelector(".move2").textContent = "";
    document.querySelector(".move3").textContent = "";
    document.querySelector(".move4").textContent = "";
    document.querySelector(".move5").textContent = "";
    document.querySelector(".move6").textContent = "";
    document.querySelector(".move7").textContent = "";
    document.querySelector(".move8").textContent = "";
}

function showHistory(){
    document.querySelector(".wrapper").classList.toggle("hidden");
    moveList.offsetHeight >= 290 ? moveList.classList.add("overflow") : moveList.classList.remove("overflow");
}

function showPrev(){
    let showState = "";
    console.log(moveCount);
    
    if (moveCount == 9){
        moveCount= moveCount - 2;
        showState = history[7];
        console.log(showState);
        cells.forEach(cell => cell.textContent = "");
        for(let i=0; i<9; i++){
            document.querySelector(`.cell${i}`).textContent = `${showState[i]}`;
        }
    } else if (moveCount <=8 && moveCount >=0){
        moveCount= moveCount - 1;
        showState = history[moveCount];
        console.log(showState);
        cells.forEach(cell => cell.textContent = "");
        for(let i=0; i<9; i++){
            document.querySelector(`.cell${i}`).textContent = `${showState[i]}`;
        }
    }
    console.log(moveCount);
}

function showNext(){
    let showState = "";
    console.log(moveCount);
        
    if (moveCount <maxMoves && moveCount >=-1){
        moveCount++;
        showState = history[moveCount];
        console.log(showState);
        cells.forEach(cell => cell.textContent = "");
        for(let i=0; i<9; i++){
            document.querySelector(`.cell${i}`).textContent = `${showState[i]}`;
        }
        
    } else {
        showState = history[moveCount];
        console.log(showState);
        cells.forEach(cell => cell.textContent = "");
        for(let i=0; i<9; i++){
            document.querySelector(`.cell${i}`).textContent = `${showState[i]}`;
        }
    }
    console.log(moveCount);
}
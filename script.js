// Factory function to players

function Player(name, marker){
  return {name, marker}
}

const gameBoard = (function () {
  let board = [
    "", "", "",
    "", "", "",
    "", "", ""] 
  
  const getBoard = () => board;

  const printBoard = () =>{
    console.log(`| ${board[0]} | ${board[1]} | ${board[2]} | `)
    console.log(`| ${board[3]} | ${board[4]} | ${board[5]} | `)
    console.log(`| ${board[6]} | ${board[7]} | ${board[8]} | `)
  }
  const update = (position, marker) =>{
    board[position] = marker
  }
  const reset = () =>{
    board = [
      "", "", "",
      "", "", "",
      "", "", ""] 
  }

  const isCellEmpty = (position) => board[position] === "";
  const checkTie = () =>{
    return board.every(cell => cell!="") && !checkWin()
  }
  const checkWin = () =>{
    const winningCombinations = [
      [0,1,2],[3,4,5],[6,7,8], // Filas
      [0,3,6],[1,4,7],[2,5,8], //Columnas
      [0,4,8],[2,4,6] // Diagonales
    ]

    for(let i = 0; i< winningCombinations.length; i++){
      let combo = winningCombinations[i];

      let pos1 = combo[0];
      let pos2 = combo[1];
      let pos3 = combo[2];

      if(board[pos1] && board[pos1] === board[pos2] && board[pos1] === board[pos3]){
        return board[pos1];
      }
    }
    return null;
  }

  return {printBoard, update, getBoard, isCellEmpty, reset, checkWin, checkTie}


}) ();


const gameController = (function () {
  const player1 = Player("Player X", "X")
  const player2 = Player("PLayer O", "O")

  let currentPlayer = player1;

  const switchTurn = () =>{
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  const playTurn = (position) =>{
    if(gameBoard.isCellEmpty(position)){
      gameBoard.update(position, currentPlayer.marker);
      if(gameBoard.checkWin()){
        console.log(`${currentPlayer.name} wins!`);
        // reiniciar
        gameBoard.reset();
        return;
      }
      if(gameBoard.checkTie()){
        console.log("It's a tie");
        gameBoard.reset();
        return;
      }
      switchTurn(); // Cambiar al siguiente jugador

    }
    else{
      console.log("cell is already taken");
    }
  }
  return {playTurn}
})();

const displayController = (function (){
  const cells = document.querySelectorAll(".cell");
  const message = document.querySelector(".message");
  const resetButton = document.querySelector(".reset-button");

  const renderBoard = () =>{
    const board = gameBoard.getBoard();
    cells.forEach((cell, index) => {
      const cellContent = cell.querySelector(".filled");
      if(board[index] == "O"){
        cellContent.src = "assets/icon-o.svg";
        cellContent.style.display = "block";
      }
      else if(board[index] == "X"){
        cellContent.src = "assets/icon-x.svg";
        cellContent.style.display = "block";
      }
      else{
        cellContent.style.display = "none";
      }
      
    })
  }
  const setMessage = (text) =>{
    message.textContent =text
  }

  const handleCellClick = (event) =>{
    const position = event.target.dataset.index;
    gameController.playTurn(position);
    renderBoard();
  }
  cells.forEach((cell) => {


    const filledIcon = document.createElement("img");
    filledIcon.src = "";
    filledIcon.classList.add("filled");
    cell.appendChild(filledIcon);
    
    cell.addEventListener("click", handleCellClick)

  
  })


  return { renderBoard };


})();

gameBoard.printBoard()

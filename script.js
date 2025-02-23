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



  return {printBoard, update, getBoard, isCellEmpty, reset, checkWin}


}) ();


const gameController = (function () {
  const player1 = Player("human", "X")
  const player2 = Player("Computer", "O")

})();

gameBoard.update(0,"X")
console.log(gameBoard.checkWin());

gameBoard.update(1,"O")
console.log(gameBoard.checkWin());

gameBoard.update(3,"X")
console.log(gameBoard.checkWin());

gameBoard.update(8,"O")
console.log(gameBoard.checkWin());


gameBoard.update(6,"X")
console.log(gameBoard.checkWin());

gameBoard.printBoard()



// Factory function to players

function player(name, marker){
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

  const isCellEmpty = (position) => board[position] === " ";

  return {printBoard, update, getBoard, isCellEmpty, reset}


}) ();

gameBoard.update(0,"X")
gameBoard.update(3,"O")
gameBoard.printBoard()
console.log(gameBoard.isCellEmpty(1));
console.log(gameBoard.isCellEmpty(2));
console.log(gameBoard.isCellEmpty(3));
gameBoard.reset();
gameBoard.printBoard()

console.log(gameBoard.isCellEmpty(1));
console.log(gameBoard.isCellEmpty(2));
console.log(gameBoard.isCellEmpty(3));

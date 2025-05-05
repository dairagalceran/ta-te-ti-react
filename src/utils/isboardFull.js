export function isBoardFull(gameBoard){
  return gameBoard.flat().every(cell => cell !== null);
}
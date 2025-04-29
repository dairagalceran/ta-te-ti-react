import React, { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard( {activePlayerSymbol , onSelectedSquare}) {

  const [gameBoard , setGameBoard] = useState(initialGameBoard);


  function handleSelectedSquare(rowIndex , colIndex){

    if(!gameBoard[rowIndex][colIndex]){

      //generar un estado nuevo, a  partir del estado actual de gameboard
      //setGemeBoard( (estadoActual) => { nuevo estado basado en el actual})
      setGameBoard( (prevGameBoard) => {
        //creo un nuevo estad "updatedBoard" y genero un clon de la matriz
        //                   [expando las filas  (por cada fila expando las columnas)]
        const updatedBoard = [...prevGameBoard.map( innerArray => [...innerArray])];
      
        //al ser un clon se puede manipular
        updatedBoard[rowIndex][colIndex] = activePlayerSymbol;

        return updatedBoard;

      })    
        // uso la función que me pasan como (callback) para invertir el estado en el componente padre
        onSelectedSquare();
    }  
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol,colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectedSquare(rowIndex , colIndex)}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}


/** 


export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    onSelectSquare();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );

}
*/
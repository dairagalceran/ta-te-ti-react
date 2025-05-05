import React, { useState , useEffect } from "react";
import {isThereAWinner} from '../utils/isThereAWinner';
import { initialGameBoard } from "../utils/initialGameBoard";
import { isBoardFull } from "../utils/isboardFull";

export default function GameBoard( {activePlayerSymbol , onSelectedSquare, winner, onSetWinner}) {
  const [gameBoard , setGameBoard] = useState(initialGameBoard);


  useEffect( ()  => {
    // Este código se ejecuta después del renderizar el componente
    const detectedWinner = isThereAWinner(gameBoard);
    if (detectedWinner) {
      onSetWinner(detectedWinner);
    } else if (isBoardFull(gameBoard)) {
      onSetWinner('draw');
    }
    // [estado o props] el efecto se ejecutará cada vez que cambie
    //[] vacio se ejecuta una sola vez al montar el componente
  }, [gameBoard, onSetWinner]);


  function handleSelectedSquare(rowIndex , colIndex){

    if(gameBoard[rowIndex][colIndex] || winner) return;

      //generar un estado nuevo, a  partir del estado actual de gameboard
      //setGemeBoard( (estadoActual) => { nuevo estado basado en el actual})
      setGameBoard( (prevGameBoard) => {
        //creo un nuevo estad "updatedBoard" y genero un clon de la matriz
        //                   [expando las filas  (por cada fila expando las columnas)]
        const updatedBoard = [...prevGameBoard.map( innerArray => [...innerArray])];     
        //al ser un clon se puede manipular
        updatedBoard[rowIndex][colIndex] = activePlayerSymbol;

        return updatedBoard;
      });

        // uso la función que me pasan como (callback) para invertir el estado en el componente padre
        onSelectedSquare();
    
  }

  return (
    <>
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol,colIndex) => (
              <li key={colIndex}>
                <button 
                  onClick={() => handleSelectedSquare(rowIndex , colIndex)}
                  >
                    {playerSymbol}
                  </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
    {winner && <p>¡Ganó {winner}!</p>}
    </>
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
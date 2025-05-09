import { useState, useEffect } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Score from './components/Score.jsx';
import HistorialTable from './components/HistoricalTable.jsx';
import { initialGameBoard } from './utils/initialGameBoard.js';

function App() {

  const [activePlayer , setActivePlayer] = useState('x');
  const [winner, setWinner] = useState(null);
  const [winnerPlayer, setWinnerPlayer] = useState(null);
  const [playerNames, setPlayerNames] = useState({ x: 'Player1' , o: 'Player2'});
  const [score, setScore] = useState({ x: 0, o: 0, draw:0});
  const [gameBoard, setGameBoard] = useState(initialGameBoard);    //se pasan como props a  GameBoard  
  const [history, setHistory] = useState([]);

  function handleSelectedSquare(){
    setActivePlayer( (currActivePlayer) => currActivePlayer === 'x' ? 'o' : 'x');
  }


  //actualiza los nombres de los jugadores si son editados
  function handleNameChange(symbol, newName){
    setPlayerNames( (prev) =>  {
      if(prev[symbol] === newName) { //chequeo que haya un cambio real para evitar loop
        return prev;
      }else{
        return { ...prev, [symbol]: newName };
      }
        
    });
  }


  // determina que jugar inicia la nueva partida
  function handleNewGame(){
    if(winner === 'draw'){
      setActivePlayer('x');
    } else{
      setActivePlayer(winner);
    }   
    setWinner(null);
  }

  //Obtener datos para actualizar HistoricalTable
  function getGameOverWinner(score , playerNames){
    if(score.x > score.o){
      return playerNames.x
    }else if (score.o >score.x){
      return playerNames.o
    }else{
      return 'draw';
    }
  }

   // actualiza el juego y reinicia los valores en cero
  function handleGameOver(){
    //Guardar resultado del juego actual 
    const newData = {
      date: new Date().toLocaleDateString(),
      playerNames: {...playerNames},
      score: {...score},
      winnerName: getGameOverWinner(score , playerNames),
    }

    // agrega newData al inicio del array history
    setHistory( historical => [ newData, ...historical]);

    //Reiniciar el juego
    setWinner(null);
    setActivePlayer('x');
    setScore({ x: 0, o: 0, draw:0});
    setGameBoard(initialGameBoard);
    setPlayerNames({ x: 'Player1', o: 'Player2' }); // reiniciar nombres
  }

  useEffect( () => {
    console.log("en use efect "+winner);
    if(winner === 'x'){
        setScore(prev => ( {...prev, x: prev.x +1} ));
    }else if(winner === 'o'){
        setScore( prev => ( {...prev, o:prev.o +1} ));
    }else if(winner === 'draw'){
        setScore( prev => ( {...prev , draw:prev.draw +1} ))
    }
  }, [winner]);



  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player playerName= {playerNames.x} 
                  symbol="x" 
                  isActive={activePlayer === 'x' && !winner} 
                  isWinner={ 'x' === winner} 
                  onWinnerName={setWinnerPlayer}
                  onNameChange={handleNameChange} 
                />
          <Player playerName= {playerNames.o}
                  symbol="o" 
                  isActive={activePlayer ==='o' && !winner} 
                  isWinner={'o' === winner}  
                  onWinnerName={setWinnerPlayer}
                  onNameChange={handleNameChange} 
                />
        </ol>
        <GameBoard 
          gameBoard={gameBoard}  
          setGameBoard={setGameBoard}
          onSelectedSquare={handleSelectedSquare} 
          activePlayerSymbol={activePlayer} 
          winner={winner}
          onSetWinner={setWinner}
          onNewGame={handleNewGame} 
          />
      </div>


      <div id='score-container'>
        <Score 
          winner={winner} 
          winnerPlayer={winnerPlayer}
          playerNames={playerNames}
          score={score}
          onGameOver={handleGameOver}
          />
        <HistorialTable
          history = {history}
          />
      </div> 
      
    </main>

  )
}

export default App;


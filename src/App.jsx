import { useState, useEffect } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Score from './components/Score.jsx';
import { initialGameBoard } from './utils/initialGameBoard.js';

function App() {

  const [activePlayer , setActivePlayer] = useState('x');
  const [winner, setWinner] = useState(null);
  const [winnerPlayer, setWinnerPlayer] = useState(null);
  const [playerNames, setPlayerNames] = useState({ x: 'Player1' , o: 'Player2'});
  const [score, setScore] = useState({ x: 0, o: 0, draw:0});
  const [gameBoard, setGameBoard] = useState(initialGameBoard);                


  function handleSelectedSquare(){
    setActivePlayer( (currActivePlayer) => currActivePlayer === 'x' ? 'o' : 'x');
  }


  function handleNameChange(symbol, newName){
    setPlayerNames( (prev) =>  {
      if(prev[symbol] === newName) { //chequeo que haya un cambio real para evitar loop
        return prev;
      }else{
        return { ...prev, [symbol]: newName };
      }
        
    });
  }


  function handleNewGame(){
    if(winner === 'draw'){
      setActivePlayer('x');
    } else{
      setActivePlayer(winner);
    }   
    setWinner(null);
  }


  function handleGameOver(){
    setWinner(null);
    setActivePlayer('x');
    setScore({ x: 0, o: 0, draw:0});
    setGameBoard(initialGameBoard);
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
        <ol id='players'className='highlight-player'>
          <Player  initialName="Player 1" 
                    symbol="x" 
                    isActive={activePlayer === 'x' && !winner} 
                    isWinner={ 'x' === winner} 
                    onWinnerName={setWinnerPlayer}
                    onNameChange={handleNameChange} />
          <Player initialName="Player 2" 
                  symbol="o" 
                  isActive={activePlayer ==='o' && !winner} 
                  isWinner={'o' === winner}  
                  onWinnerName={setWinnerPlayer}
                  onNameChange={handleNameChange} />
        </ol>
        <GameBoard 
          gameBoard={gameBoard}
          setGameBoard={setGameBoard}
          onSelectedSquare={handleSelectedSquare} 
          activePlayerSymbol={activePlayer} 
          winner={winner}
          onSetWinner={setWinner}
          onNewGame={handleNewGame} />
      </div>

      <div id='score-container'>
        <Score 
          winner={winner} 
          winnerPlayer={winnerPlayer}
          playerNames={playerNames}
          score={score}
          onGameOver={handleGameOver}
        />
      </div> 
      
    </main>

  )
}

export default App;


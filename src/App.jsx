import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurn) {
  let currentPlayer = 'X';

  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = '0';
  }
  return currentPlayer;
}


function App() {
  const [players, setPlayers] = useState({
    X : 'Player 1',
    0 : 'Player 2'
  })
  const [gameTurn, setGameTurn] = useState([]);
  const [hasWinner, setHasWinner] = useState(false);
  //const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurn);

  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for (const turn of gameTurn) {
    const { sequre, player} = turn;
    const { row, col} = sequre;

    gameBoard[row][col] = player;

  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSqureSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSqureSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSqureSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSqureSymbol && firstSqureSymbol === secondSqureSymbol && firstSqureSymbol === thirdSqureSymbol) {
      winner = players[firstSqureSymbol];
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectSqure(rowIndex, colIndex) {
    //setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? '0' : 'X'))
    setGameTurn((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurn = [ 
        { sequre: { row: rowIndex, col: colIndex}, player: currentPlayer},
         ...prevTurn,
        ];

      return updatedTurn;
    });
  }

  function handleRematch() {
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
      
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">

          <Player 
            initialName='Player 1' 
            symbol='X' 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            initialName='Player 2' 
            symbol='0' 
            isActive={activePlayer === '0'}
            onChangeName={handlePlayerNameChange}
          />
          
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onSelect={handleRematch}/>}
        <GameBoard onSelectSqure={handleSelectSqure} board={gameBoard}/>
      </div>
    <Log turns={gameTurn}/>
    </main>
  )
}

export default App





export default function GameBoard({ onSelectSqure, board }) {
  

  

  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSqure(rowIndex, colIndex) {
  //   setGameBoard((preGameBoard) => {
  //     const updateBoard = [...preGameBoard.map((innerArray) => [...innerArray])];
  //     updateBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updateBoard;
  //   })
  //   onSelectSqure();
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => 
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => 
              <li key={colIndex}>
                <button onClick={() => onSelectSqure(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
              </li>)}
          </ol>
        </li>)}
    </ol>
  )
}

export default function Log({ turns}) {
  return (
  <ol id="log">
    {turns.map(turn => <li key={`${turn.sequre.row} ${turn.sequre.col}`}>{turn.player} selected {turn.sequre.row} {turn.sequre.col}</li>)}
  </ol>
  )
}
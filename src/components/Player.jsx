import { useState } from "react";

export default function Player({initialName, symbol, isActive, onChangeName}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChanges(event) {
    setPlayerName(event.target.value)
  }

  let editName = <span className="player-name">{playerName}</span>

  if (isEditing) {
    editName = <input type="text" placeholder="Enter Name" required value={playerName} onChange={handleChanges}/>
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'save' : 'edit'}</button>
    </li>
  );
}
// Import the useState hook from React for managing state in functional components
import { useState } from "react";

// Functional component representing a player in the Tic-Tac-Toe game
export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  // State for managing player name and edit mode
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  // Event handler for toggling the edit mode and saving changes
  function handleEditClick() {
    setIsEditing((editing) => !editing);

    // Call the onChangeName prop to update the parent component's state
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  // Event handler for handling changes in the player name input
  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  // Define JSX elements based on whether the player is editing or not
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  let btnCaption = "Edit";

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    btnCaption = "Save";
  }

  // Render the player component with dynamic styling and UI elements
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>

      {/* Button to toggle between edit and save modes */}
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}

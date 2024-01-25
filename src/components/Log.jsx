// Functional component representing the log of game turns in the Tic-Tac-Toe game
export default function Log({ turns }) {
  // Render an ordered list (ol) to display the game turns
  return (
    <ol id="log">
      {/* Map through each turn and display a list item for each */}
      {turns.map((turn) => (
        // Set a unique key for each list item based on the square's coordinates
        <li key={`${turn.square.row}${turn.square.col}`}>
          {/* Display the player's symbol and the selected square's coordinates */}
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}

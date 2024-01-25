// Functional component representing the game-over message in the Tic-Tac-Toe game
export default function GameOver({ winner, onRestart }) {
  // Render a div with the game-over message
  return (
    <div id="game-over">
      <h2>Game Over!</h2>

      {/* Display a message if there is a winner */}
      {winner && <p>{winner} won!</p>}

      {/* Display a message if it's a draw */}
      {!winner && <p>It's a draw!</p>}

      {/* Button to trigger a game rematch */}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}

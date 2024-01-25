// Import the useState hook from React for managing state in functional components
import { useState } from "react";

// Importing custom components for the Tic-Tac-Toe game
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

// Import the predefined winning combinations for the game
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

// Define the initial players and their symbols
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

// Define the initial state for the game board
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Function to derive the active player based on the game turns
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

// Function to derive the game board based on the game turns
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

// Function to determine the winner based on the game board and players
function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

// Main functional component for the Tic-Tac-Toe game
function App() {
  // State for managing players and game turns
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  // Derive the active player, game board, winner, and draw status
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  // Event handler for selecting a square on the game board
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  // Event handler for restarting the game
  function handleRestart() {
    setGameTurns([]);
  }

  // Event handler for changing player names
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  // JSX structure for the Tic-Tac-Toe game
  return (
    <main>
      <div id="game-container">
        {/* Display the players and their information */}
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {/* Display the game over message when there's a winner or a draw */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}

        {/* Render the game board and handle square selection */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>

      {/* Display the log of game turns */}
      <Log turns={gameTurns} />
    </main>
  );
}

// Export the App component as the default export
export default App;

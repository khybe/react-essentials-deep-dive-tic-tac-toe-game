// Import the useState hook from React for managing state in functional components
import { useState } from "react";

// Functional component representing the game board in the Tic-Tac-Toe game
export default function GameBoard({ onSelectSquare, board }) {
  // Render an ordered list (ol) to represent the game board
  return (
    <ol id="game-board">
      {/* Map through each row in the board */}
      {board.map((row, rowIndex) => (
        // Set a unique key for each row
        <li key={rowIndex}>
          {/* Render an ordered list (ol) for each row to represent columns */}
          <ol>
            {/* Map through each column in the row */}
            {row.map((playerSymbol, colIndex) => (
              // Set a unique key for each column
              <li key={colIndex}>
                {/* Render a button for each square in the game board */}
                <button
                  // Attach an onClick event to handle square selection
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  // Disable the button if the square is already occupied
                  disabled={playerSymbol !== null}
                >
                  {/* Display the player's symbol in the button */}
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

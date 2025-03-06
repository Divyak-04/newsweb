import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const generateSudokuGrid = () => {
  const grid = Array(9)
    .fill(null)
    .map(() => Array(9).fill(0));
  const presetNumbers = [
    [0, 0, 5],
    [1, 3, 3],
    [2, 6, 7],
    [3, 1, 6],
    [4, 4, 1],
    [5, 7, 9],
    [6, 2, 4],
    [7, 5, 2],
    [8, 8, 8],
  ];
  presetNumbers.forEach(([r, c, val]) => (grid[r][c] = val));
  return grid;
};

const isValidSudoku = (grid) => {
  const isValidSet = (arr) => new Set(arr).size === 9 && !arr.includes(0);

  for (let i = 0; i < 9; i++) {
    if (!isValidSet(grid[i]) || !isValidSet(grid.map((row) => row[i]))) {
      return false;
    }
  }
  
  for (let r = 0; r < 9; r += 3) {
    for (let c = 0; c < 9; c += 3) {
      let square = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          square.push(grid[r + i][c + j]);
        }
      }
      if (!isValidSet(square)) {
        return false;
      }
    }
  }
  return true;
};

const Sudoku = () => {
  const [grid, setGrid] = useState(generateSudokuGrid());
  const [isWon, setIsWon] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const { width, height } = useWindowSize();

  const checkWin = () => {
    if (isValidSudoku(grid)) {
      setIsWon(true);
    }
  };

  const handleCellChange = (row, col, value) => {
    if (grid[row][col] !== 0) return;
    const newGrid = grid.map((r, rowIndex) =>
      r.map((c, colIndex) =>
        rowIndex === row && colIndex === col ? parseInt(value) || 0 : c
      )
    );
    setGrid(newGrid);
  };

  const resetGame = () => {
    setGrid(generateSudokuGrid());
    setIsWon(false);
    setSelectedCell({ row: null, col: null });
  };

  useEffect(() => {
    if (isValidSudoku(grid)) {
      setIsWon(true);
    }
  }, [grid]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      {isWon && <Confetti width={width} height={height} />}
      <h1 className="text-4xl font-bold text-blue-800 mb-4">🧩 Sudoku Challenge</h1>
      <p className="text-gray-600 mb-6 text-center">
        Fill the grid with numbers 1-9 without repeating in rows, columns, and boxes.
      </p>
      <div className="grid grid-cols-9 gap-1 border-4 border-blue-800 p-2 bg-white shadow-2xl rounded-lg">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              className={`w-12 h-12 text-center text-2xl font-bold border ${
                selectedCell.row === rowIndex && selectedCell.col === colIndex
                  ? "border-4 border-blue-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all`}
              maxLength="1"
              value={cell !== 0 ? cell : ""}
              onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
              onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
              readOnly={cell !== 0}
            />
          ))
        )}
      </div>
      <div className="mt-6 flex gap-4">
        <button
          className="bg-blue-500 text-white px-6 py-2 text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all"
          onClick={checkWin}
        >
          Check Solution
        </button>
        <button
          className="bg-purple-500 text-white px-6 py-2 text-lg font-semibold rounded-lg hover:bg-purple-700 transition-all"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
      {isWon && (
        <div className="mt-6 text-3xl font-bold text-green-600 animate-bounce">
          🎉 Congratulations! You solved the Sudoku! 🎉
        </div>
      )}
    </div>
  );
};

export default Sudoku;
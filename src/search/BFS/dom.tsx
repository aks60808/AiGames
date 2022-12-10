import React, { useState, useEffect } from "react";
import { Board } from "../board";
import BFS from "./search";
import "./style.css";

const BFSDOM = () => {
  const [board, setBoard] = useState(new Board([0, 0], [9, 9]));
  const [pathFound, setPathFound] = useState(false);
  const [updatePath, setupdatePath] = useState(false);
  useEffect(() => {
    const b = new Board([0, 0], [18, 18]);
    b.createMaze(20, 20);
    for (let i = 0; i < 150; i++) {
      const x = Math.floor(Math.random() * b.board.length);
      const y = Math.floor(Math.random() * b.board.length);
      b.setWall(x, y);
    }
    setBoard(b);
  }, []);
  useEffect(() => {
    const bfs = new BFS(board);
    if (updatePath) {
      const pathFound = bfs.search();
      let num = 0;
      if (pathFound) {
        const path = bfs.visitedNodes;
        path.forEach((node) => {
          if (node !== undefined) {
            setTimeout(
              (board) => {
                board.setPath(node.row, node.col);
                const newBoard = new Board(board.start, board.end);
                newBoard.board = board.board.map((row) => [...row]);
                setBoard(newBoard); // Call setBoard here to update the board state and trigger a re-render
              },
              20 * num,
              board
            );
            num++;
          }
        });
      }
      setPathFound(pathFound);
      setupdatePath(false);
    }
  }, [board, updatePath]);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement) {
      const id = e.target.id;
      const [row, col] = id.split("-");
      const newBoard = new Board(board.start, board.end);
      newBoard.board = board.board.map((row) => [...row]);

      // Apply the changes to the new board object
      newBoard.setWall(parseInt(row), parseInt(col));
      newBoard.clearBoard();
      setBoard(newBoard); // Call setBoard here to update the board state and trigger a re-render
      setupdatePath(false);
    }
  };

  return (
    <div className="maze-container">
      {board ? (
        <div
          className="boardBFS"
          style={{
            gridTemplateColumns: `repeat(${board.board.length},1fr)`,
            gridTemplateRows: `repeat(${board.board[0].length},1fr)`,
          }}
        >
          {board.board.map((rows, rowIndex) =>
            rows.map((col, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}-${col}`}
                id={`${rowIndex}-${colIndex}`}
                className={
                  col === board.startNum
                    ? "startBFS tileBFS"
                    : col === board.endNum
                    ? "endBFS  tileBFS"
                    : col === 5
                    ? "wallBFS  tileBFS"
                    : col === 1
                    ? "visitedBFS  tileBFS"
                    : col === 2
                    ? "pathBFS  tileBFS"
                    : "emptyBFS  tileBFS"
                }
                onClick={handleClick}
              >
                {col === board.startNum
                  ? "=>"
                  : col === board.endNum
                  ? "X"
                  : ""}
              </div>
            ))
          )}
        </div>
      ) : null}
      <button
        onClick={() => {
          setupdatePath(true);
          setBoard(board);
        }}
      >
        Start Search
      </button>
      {pathFound ? <div>Path found!</div> : null}
    </div>
  );
};

export default BFSDOM;

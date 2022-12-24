import React, { useState, useEffect } from "react";
import { Board } from "./board";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import BFS from "../search/BFS/search";
import DFS from "../search/DFS/search";
import Astar from "../search/AStar/search";
import "./style.css";

const SEARCHDOM = () => {
  const [board, setBoard] = useState(new Board([0, 0], [9, 9]));
  const [boardSize, setBoardSize] = useState(10);
  const [pathFound, setPathFound] = useState(false);
  const [searchAlgo, setSearchAlgo] = useState("BFS");

  const generateMaze = (size: number) => {
    const b = new Board([0, 0], [size - 1, size - 1]);
    b.createMaze(size, size);
    for (let i = 0; i < (size * size) / 2; i++) {
      const x = Math.floor(Math.random() * b.board.length);
      const y = Math.floor(Math.random() * b.board[0].length);
      b.setWall(x, y);
    }
    setBoard(b);
  };
  useEffect(() => {
    generateMaze(boardSize);
  }, [boardSize]);
  const showSearch = (path: any, num: number, type: String) => {
    let visitedNodes: any[] = [];
    path.forEach((node: any) => {
      if (
        node !== undefined &&
        !visitedNodes.some(
          (vnode) => vnode.row === node.row && vnode.col === node.col
        )
      ) {
        setTimeout(
          (board) => {
            if (type === "path") {
              board.setPath(node.row, node.col);
            } else if (type === "visited") {
              board.setVisted(node.row, node.col);
            }
            const newBoard = new Board(board.start, board.end);
            newBoard.board = board.board.map((row) => [...row]);
            setBoard(newBoard); // Call setBoard here to update the board state and trigger a re-render
          },
          15 * num,
          board
        );
        num++;
        visitedNodes.push(node);
      }
    });
    return num;
  };
  const searchMaze = () => {
    let search = null;
    if (searchAlgo === "BFS") {
      search = new BFS(board);
    } else if (searchAlgo === "DFS") {
      search = new DFS(board);
    } else {
      search = new Astar(board);
    }
    const pathFound = search.search();
    let num = showSearch(search.searchpath, 0, "visited");
    if (pathFound) {
      showSearch(search.path, num, "path");
    }
    setPathFound(pathFound);
  };
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
      setPathFound(false);
    }
  };
  const clearBoard = () => {
    const newBoard = new Board(board.start, board.end);
    newBoard.board = board.board.map((row) => [...row]);

    // Apply the changes to the new board object
    newBoard.clearBoard();
    setBoard(newBoard); // Call setBoard here to update the board state and trigger a re-render
    setPathFound(false);
  };
  const navBar = () => {
    let currentAlgo = `Current Algorithm: ${searchAlgo}`;
    return (
      <Navbar
        bg="secondary"
        variant="dark"
        expand="sm"
        collapseOnSelect
        style={{
          paddingLeft: "10px",
          width: "min(85vw,85vh)",
        }}
      >
        <DropdownButton
          id="dropdown-basic-button"
          title={currentAlgo}
          variant="dark"
        >
          <Dropdown.Item
            onClick={() => {
              clearBoard();
              setSearchAlgo("BFS");
            }}
          >
            BFS
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              clearBoard();
              setSearchAlgo("DFS");
            }}
          >
            DFS
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              clearBoard();
              setSearchAlgo("A-Star");
            }}
          >
            A-Star
          </Dropdown.Item>
        </DropdownButton>
        <Button
          variant="warning"
          style={{ marginLeft: "10px" }}
          onClick={clearBoard}
        >
          Clear
        </Button>
        <Button
          variant="success"
          style={{ marginLeft: "10px" }}
          onClick={searchMaze}
        >
          Search
        </Button>
        <div className="form-group range-wrap">
          <input
            type="range"
            className="form-control-range"
            id="customRange1"
            min="5"
            max="35"
            value={boardSize}
            onChange={(e) => setBoardSize(parseInt(e.target.value))}
          />
        </div>
      </Navbar>
    );
  };
  return (
    <div className="maze-container">
      {navBar()}
      {board ? (
        <div
          className="boardSearch"
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
                    ? "start tile"
                    : col === board.endNum
                    ? "end  tile"
                    : col === 5
                    ? "wall  tile"
                    : col === 1
                    ? "visited  tile"
                    : col === 2
                    ? "path  tile"
                    : "empty  tile"
                }
                onClick={handleClick}
              >
                {col === board.startNum ? "" : col === board.endNum ? "" : ""}
              </div>
            ))
          )}
        </div>
      ) : null}
      {pathFound ? <div>Path found!</div> : null}
    </div>
  );
};
export default SEARCHDOM;

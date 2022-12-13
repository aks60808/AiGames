import React, { useState, useEffect } from "react";
import { Board } from "./board";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import BFS from "../search/BFS/search";
import DFS from "../search/DFS/search";
import "./style.css";

const SEARCHDOM = () => {
  const [board, setBoard] = useState(new Board([0, 0], [9, 9]));
  const [pathFound, setPathFound] = useState(false);
  const [searchAlgo, setSearchAlgo] = useState("BFS");

  useEffect(() => {
    const b = new Board([0, 0], [18, 18]);
    b.createMaze(20, 20);
    for (let i = 0; i < 200; i++) {
      const x = Math.floor(Math.random() * b.board.length);
      const y = Math.floor(Math.random() * b.board[0].length);
      b.setWall(x, y);
    }
    setBoard(b);
  }, []);
  const showSearch = (path: any, num: number, type: String) => {
    path.forEach((node: any) => {
      if (node !== undefined) {
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
          20 * num,
          board
        );
        num++;
      }
    });
    return num;
  };
  const searchMaze = () => {
    let search = null;
    if (searchAlgo === "BFS") {
      search = new BFS(board);
    } else {
      search = new DFS(board);
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
        style={{ paddingLeft: "10px", marginTop: "1.5vh", width: "800px" }}
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

import React, { useState, useEffect } from "react";
import Sudoku from "./sudoku";
import SudokuGenerator from "./generator";
import { CircleMenu, CircleMenuItem } from "react-circular-menu";
import "./styles.css";

export default function SudokuSolver() {
  const [grid, setGrid] = useState([[0]]);
  const [solution, setSolution] = useState([[0]]);
  const [showMenu, setShowMenu] = useState(false);
  const [attempt, setAttempt] = useState(false);
  const [menuID, setMenuID] = useState({ row: 0, column: 0 });
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const [solving, setSolving] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [solveSteps, setSolveSteps] = useState([[[0]]]);
  useEffect(() => {
    let temp = new SudokuGenerator().getGrid();
    setGrid([...temp]);
  }, []);
  useEffect(() => {
    setSolution(JSON.parse(JSON.stringify(grid)));
  }, [grid]);
  useEffect(() => {
    if (attempt) {
      setSolution(JSON.parse(JSON.stringify(grid)));
    }
  }, [attempt, grid]);
  useEffect(() => {
    if (solving && currentStep < solveSteps.length - 1) {
      setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 50);
    }
  }, [solving, currentStep, solveSteps]);
  function showMenuFunc(
    row: number,
    column: number,
    event: React.MouseEvent<HTMLDivElement>
  ) {
    setShowMenu(true);
    setMenuID({ row, column });
    setMenuPosition({
      top: event.clientY,
      left: event.clientX,
    });
  }
  function solve() {
    setSolving(true);
    const sudoku = new Sudoku(solution);
    setCurrentStep(0);
    setSolveSteps(sudoku.solve());
  }
  function handleSubmit() {
    const sudoku = new Sudoku(solution);
    if (sudoku.isValid()) {
      //setGrid(solution);
      alert("Solved");
    } else {
      alert("Invalid solution");
      setAttempt(true);
      setTimeout(() => setAttempt(false), 3000);
    }
  }

  return (
    <div className="sudoku">
      <div className="sodukuGrid">
        {solving
          ? solveSteps[currentStep].map((row, i) =>
              row.map((value, j) => (
                <div
                  style={
                    0 === grid[i][j]
                      ? attempt
                        ? { border: "5px solid red", color: "#7daef4" }
                        : { color: "#7daef4" }
                      : { color: "#ebeb9d" }
                  }
                  key={`${i}-${j}`}
                  className="sodukuGridItem"
                  onClick={(e) => showMenuFunc(i, j, e)}
                >
                  {value > 0 ? value : ""}
                </div>
              ))
            )
          : solution.map((row, i) =>
              row.map((value, j) => (
                <div
                  style={
                    0 === grid[i][j]
                      ? attempt
                        ? { border: "5px solid red", color: "#7daef4" }
                        : { color: "#7daef4" }
                      : { color: "#ebeb9d" }
                  }
                  key={`${i}-${j}`}
                  className="sodukuGridItem"
                  onClick={(e) => showMenuFunc(i, j, e)}
                >
                  {value > 0 ? value : ""}
                </div>
              ))
            )}
      </div>
      {showMenu && (
        <div
          style={{
            position: "absolute",
            top: menuPosition.top,
            left: menuPosition.left,
            zIndex: 1,
          }}
        >
          <CircleMenu
            startAngle={-90}
            rotationAngle={320}
            itemSize={1}
            radius={4}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <CircleMenuItem
                key={item}
                onClick={() => {
                  let temp = solution;
                  temp[menuID.row][menuID.column] = item;
                  setSolution(temp);
                  setShowMenu(false);
                }}
              >
                {item}
              </CircleMenuItem>
            ))}
          </CircleMenu>
        </div>
      )}
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={solve}>Solve</button>
    </div>
  );
}

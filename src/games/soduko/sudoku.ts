import { Console } from "console";

export default class Sudoku {
  public grid: number[][];

  constructor(grid: number[][]) {
    this.grid = JSON.parse(JSON.stringify(grid));
  }

  isValid(): boolean {
    // Check that each row has the numbers 1-9
    for (let i = 0; i < 9; i++) {
      const row = this.grid[i];
      if (!this.isValidRow(row)) {
        return false;
      }
    }

    // Check that each column has the numbers 1-9
    for (let i = 0; i < 9; i++) {
      const column = [];
      for (let j = 0; j < 9; j++) {
        column.push(this.grid[j][i]);
      }
      if (!this.isValidRow(column)) {
        return false;
      }
    }

    // Check that each 3x3 block has the numbers 1-9
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        const block = [];
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            block.push(this.grid[i + k][j + l]);
          }
        }
        if (!this.isValidRow(block)) {
          return false;
        }
      }
    }

    return true;
  }

  private isValidRow(row: number[]): boolean {
    const values = new Set();
    for (const value of row) {
      if (value < 1 || value > 9 || values.has(value)) {
        return false;
      }
      values.add(value);
    }
    return true;
  }
  public solve(): number[][][] {
    const steps: number[][][] = [];
    let currentStep: number[][] = [];
    for (let i = 0; i < 9; i++) {
      currentStep[i] = this.grid[i].slice();
    }
    steps.push(currentStep);

    function backtrack(grid: number[][], steps: number[][][]): boolean {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (grid[i][j] === 0) {
            for (let k = 1; k <= 9; k++) {
              if (isValidPlacement(grid, i, j, k)) {
                grid[i][j] = k;
                currentStep = [];
                for (let l = 0; l < 9; l++) {
                  currentStep[l] = grid[l].slice();
                }
                steps.push(currentStep);
                if (backtrack(grid, steps)) {
                  return true;
                } else {
                  grid[i][j] = 0;
                }
              }
            }
            return false;
          }
        }
      }
      return true;
    }

    function isValidPlacement(
      grid: number[][],
      row: number,
      col: number,
      value: number
    ): boolean {
      // Check row
      for (let i = 0; i < 9; i++) {
        if (grid[row][i] === value) {
          return false;
        }
      }

      // Check column
      for (let i = 0; i < 9; i++) {
        if (grid[i][col] === value) {
          return false;
        }
      }

      // Check 3x3 subgrid
      const subgridRow = Math.floor(row / 3) * 3;
      const subgridCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[subgridRow + i][subgridCol + j] === value) {
            return false;
          }
        }
      }

      return true;
    }

    if (backtrack(this.grid, steps)) {
      return steps;
    } else {
      return [this.grid];
    }
  }
}

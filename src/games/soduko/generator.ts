import Sudoku from "./sudoku";

export default class SudokuGenerator {
  private grid: number[][];

  constructor() {
    this.grid = this.generate();
  }

  getGrid(): number[][] {
    return this.grid;
  }

  private generate(): number[][] {
    // Start with a solved grid
    const grid = this.getSolvedGrid();
    let count = 81;
    let depth = 0;
    // Remove numbers randomly until there is only one solution left
    while (count > 30 && depth < 10000) {
      const cell = this.getRandomCell(grid);
      const value = grid[cell.row][cell.column];
      grid[cell.row][cell.column] = 0;
      if (value !== 0) {
        count -= 1;
      }
      if (this.getSolutionCount(grid) > 1) {
        grid[cell.row][cell.column] = value;
        count += 1;
      } else {
        depth += 1;
      }
    }

    return grid;
  }

  private getSolvedGrid(): number[][] {
    const grid = [...Array(9)].map(() => Array(9).fill(0));
    return this.solve(grid, 0, 0) ? grid : [];
  }
  private solve(grid: number[][], row: number, column: number): boolean {
    if (row === 9) {
      return true;
    }
    if (grid[row][column] !== 0) {
      return this.solve(grid, column === 8 ? row + 1 : row, (column + 1) % 9);
    }
    let start = Math.floor(Math.random() * 9) + 1;
    for (let i = 1; i <= 9; i++) {
      if (this.isValid(grid, row, column, ((start + i) % 9) + 1)) {
        grid[row][column] = ((start + i) % 9) + 1;
        if (this.solve(grid, column === 8 ? row + 1 : row, (column + 1) % 9)) {
          return true;
        }
        grid[row][column] = 0;
      }
    }
    return false;
  }

  private isValid(
    grid: number[][],
    row: number,
    column: number,
    value: number
  ): boolean {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === value || grid[i][column] === value) {
        return false;
      }
    }
    const blockRow = Math.floor(row / 3) * 3;
    const blockColumn = Math.floor(column / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[blockRow + i][blockColumn + j] === value) {
          return false;
        }
      }
    }
    return true;
  }
  private getRandomCell(grid: number[][]): { row: number; column: number } {
    const row = Math.floor(Math.random() * grid.length);
    const column = Math.floor(Math.random() * grid[0].length);
    return { row: row, column: column };
  }

  private getSolutionCount(grid: number[][]): number {
    return 1;
  }

  private solve2(
    grid: number[][],
    row: number,
    column: number,
    callback: (solution: number[][]) => void
  ): void {
    if (row === 9) {
      callback(grid);
      return;
    }
    if (grid[row][column] !== 0) {
      this.solve2(
        grid,
        column === 8 ? row + 1 : row,
        (column + 1) % 9,
        callback
      );
      return;
    }
    for (let i = 1; i <= 9; i++) {
      if (this.isValid(grid, row, column, i)) {
        grid[row][column] = i;
        this.solve2(
          grid,
          column === 8 ? row + 1 : row,
          (column + 1) % 9,
          callback
        );
        grid[row][column] = 0;
      }
    }
  }
}

export class Board {
  start: number[];
  end: number[];
  wall: number;
  visited: number;
  path: number;
  board: number[][];
  startNum = 999;
  endNum = 1000;
  constructor(start: number[], end: number[]) {
    this.start = start;
    this.end = end;
    this.board = [[-1]];
    this.wall = 5;
    this.visited = 1;
    this.path = 2;
  }

  createMaze(rows: number, columns: number): void {
    for (let i = 0; i < rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < columns; j++) {
        if (i === this.start[0] && j === this.start[1]) {
          this.board[i].push(this.startNum);
        } else if (i === this.end[0] && j === this.end[1]) {
          this.board[i].push(this.endNum);
        } else {
          this.board[i].push(-1);
        }
      }
    }
  }

  setWall(row: number, col: number): void {
    if (
      this.board[row][col] !== this.wall &&
      this.board[row][col] !== this.startNum &&
      this.board[row][col] !== this.endNum
    ) {
      this.board[row][col] = this.wall;
    } else if (this.board[row][col] === this.wall) {
      this.board[row][col] = -1;
    }
  }
  clearBoard(): void {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        if (
          this.board[i][j] === this.path ||
          this.board[i][j] === this.visited
        ) {
          this.board[i][j] = -1;
        }
      }
    }
  }

  setStart(row: number, col: number): void {
    this.start = [row, col];
  }

  setEnd(row: number, col: number): void {
    this.end = [row, col];
  }
  setVisted(row: number, col: number): void {
    if (
      !(
        (row === this.start[0] && col === this.start[1]) ||
        (row === this.end[0] && col === this.end[1])
      )
    ) {
      this.board[row][col] = this.visited;
    }
  }
  setPath(row: number, col: number): void {
    if (
      !(
        (row === this.start[0] && col === this.start[1]) ||
        (row === this.end[0] && col === this.end[1])
      )
    ) {
      this.board[row][col] = this.path;
    }
  }
}

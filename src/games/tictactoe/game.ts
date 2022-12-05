// Class for the Tic-Tac-Toe game
interface Moves {
  x: number;
  y: number;
}
export class TicTacToe {
  // Private fields
  private board: string[][];
  private turn: number;
  private moves: number;
  public possibleMoves: Moves[];
  // Constructor
  constructor() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.turn = 0;
    this.moves = 0;
    this.possibleMoves = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ];
  }

  // Public methods
  public makeMove(move: { x: number; y: number }): void {
    this.board[move.x][move.y] = this.turn === 0 ? "X" : "O";
    this.turn = this.turn === 0 ? 1 : 0;
    this.moves++;
    this.possibleMoves = this.possibleMoves.filter((nmove) => {
      return !(move.x === nmove.x && move.y === nmove.y);
    });
  }
  public getBoard() {
    return this.board;
  }
  public getTurn() {
    return this.turn;
  }
  public isGameOver(): boolean {
    // Check if there's a winner
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2] &&
        this.board[i][0] !== ""
      ) {
        return true;
      }
      if (
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i] &&
        this.board[0][i] !== ""
      ) {
        return true;
      }
    }
    // Check diagonals
    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2] &&
      this.board[0][0] !== ""
    ) {
      return true;
    }
    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0] &&
      this.board[0][2] !== ""
    ) {
      return true;
    }
    // Check if there's a draw
    if (this.moves === 9) {
      return true;
    }
    return false;
  }

  public getScore(): number {
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2] &&
        this.board[i][0] !== ""
      ) {
        if (this.board[i][0] === "X") {
          return 1;
        } else {
          return -1;
        }
      }
      if (
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i] &&
        this.board[0][i] !== ""
      ) {
        if (this.board[0][i] === "X") {
          return 1;
        } else {
          return -1;
        }
      }
    }
    // Check diagonals
    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2] &&
      this.board[0][0] !== ""
    ) {
      if (this.board[0][0] === "X") {
        return 1;
      } else {
        return -1;
      }
    }
    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0] &&
      this.board[0][2] !== ""
    ) {
      if (this.board[0][2] === "X") {
        return 1;
      } else {
        return -1;
      }
    }
    // Return 0 if game is not over yet
    return 0;
  }

  public undoMove(move: { x: number; y: number }): void {
    this.board[move.x][move.y] = "";
    this.turn = this.turn === 0 ? 1 : 0;
    this.possibleMoves.push(move);
    this.moves--;
  }
  public resetGame(): void {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.turn = 0;
    this.moves = 0;
    this.possibleMoves = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ];
  }
}

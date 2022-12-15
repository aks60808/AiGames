export class ConnectFour {
  private board: string[][];
  private turn: number;
  private moves: number;
  private moveOrder: number[];
  public possibleMoves: number[];

  constructor() {
    // create empty board
    this.board = [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ];
    this.turn = 0;
    this.moves = 0;
    this.possibleMoves = [3, 2, 4, 1, 5, 6, 0];
    this.moveOrder = [3, 2, 4, 1, 5, 6, 0];
  }

  // makeMove: given a column, place a piece in that columns
  makeMove(column: number): void {
    for (let i = 5; i >= 0; i--) {
      if (this.board[i][column] === "") {
        this.board[i][column] = this.turn === 0 ? "Red" : "Yellow";
        this.turn = this.turn === 0 ? 1 : 0;
        this.moves++;
        break;
      }
    }
    if (this.board[0][column] !== "") {
      this.possibleMoves = this.possibleMoves.filter((move) => {
        return !(move === column);
      });
    }
  }
  public getBoard() {
    return this.board;
  }
  public getTurn() {
    return this.turn;
  }
  // isGameOver: check if the game is over by checking for a winner
  isGameOver(): boolean {
    //Check rows
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          this.board[row][col] !== "" &&
          this.board[row][col] === this.board[row][col + 1] &&
          this.board[row][col] === this.board[row][col + 2] &&
          this.board[row][col] === this.board[row][col + 3]
        ) {
          return true;
        }
      }
    }

    //Check columns
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        if (
          this.board[row][col] !== "" &&
          this.board[row][col] === this.board[row + 1][col] &&
          this.board[row][col] === this.board[row + 2][col] &&
          this.board[row][col] === this.board[row + 3][col]
        ) {
          return true;
        }
      }
    }

    //Check diagonals
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          this.board[row][col] !== "" &&
          this.board[row][col] === this.board[row + 1][col + 1] &&
          this.board[row][col] === this.board[row + 2][col + 2] &&
          this.board[row][col] === this.board[row + 3][col + 3]
        ) {
          return true;
        }
      }
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 3; col < 7; col++) {
        if (
          this.board[row][col] !== "" &&
          this.board[row][col] === this.board[row + 1][col - 1] &&
          this.board[row][col] === this.board[row + 2][col - 2] &&
          this.board[row][col] === this.board[row + 3][col - 3]
        ) {
          return true;
        }
      }
    }
    //If none of the cases above are true, the game is not over yet
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (this.board[row][col] === "") {
          return false;
        }
      }
    }
    return true;
  }

  // getScore
  getScore(): number {
    //Check rows
    let score = 0;
    if (this.moves === 42) return 0;
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          this.board[row][col] !== "" &&
          this.board[row][col] === this.board[row][col + 1] &&
          this.board[row][col] === this.board[row][col + 2]
        ) {
          if (this.board[row][col] === this.board[row][col + 3])
            if (this.board[row][col] === "Red") {
              if (this.board[row][col] === this.board[row][col + 3]) {
                score += 5 - this.moves * 0.01;
              } else {
                score += 1 - this.moves * 0.01;
              }
            } else {
              if (this.board[row][col] === this.board[row][col + 3]) {
                score += -5 + this.moves * 0.01;
              } else {
                score += -1 + this.moves * 0.01;
              }
            }
        }
      }
    }

    //Check columns
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        if (
          this.board[row][col] !== "" &&
          this.board[row][col] === this.board[row + 1][col] &&
          this.board[row][col] === this.board[row + 2][col]
        ) {
          if (this.board[row][col] === "Red") {
            if (this.board[row][col] === "Red") {
              if (this.board[row][col] === this.board[row + 3][col]) {
                score += 5 - this.moves * 0.01;
              } else {
                score += 1 - this.moves * 0.01;
              }
            } else {
              if (this.board[row][col] === this.board[row + 3][col]) {
                score += -5 + this.moves * 0.01;
              } else {
                score += -1 + this.moves * 0.01;
              }
            }
          }
        }
      }
    }

    //Check diagonals
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          this.board[row][col] !== "" &&
          this.board[row][col] === this.board[row + 1][col + 1] &&
          this.board[row][col] === this.board[row + 2][col + 2]
        ) {
          if (this.board[row][col] === "Red") {
            if (this.board[row][col] === this.board[row + 3][col + 3]) {
              score += 5 - this.moves * 0.01;
            } else {
              score += 1 - this.moves * 0.01;
            }
          } else {
            if (this.board[row][col] === this.board[row + 3][col + 3]) {
              score += -5 + this.moves * 0.01;
            } else {
              score += -1 + this.moves * 0.01;
            }
          }
        }
      }
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 3; col < 7; col++) {
        if (
          this.board[row][col] !== "" &&
          this.board[row][col] === this.board[row + 1][col - 1] &&
          this.board[row][col] === this.board[row + 2][col - 2]
        ) {
          if (this.board[row][col] === "Red") {
            if (this.board[row][col] === this.board[row + 3][col - 3]) {
              score += 5 - this.moves * 0.01;
            } else {
              score += 1 - this.moves * 0.01;
            }
          } else {
            if (this.board[row][col] === this.board[row + 3][col - 3]) {
              score += -5 + this.moves * 0.01;
            } else {
              score += -1 + this.moves * 0.01;
            }
          }
        }
      }
    }
    return score;
  }

  // undoMove: remove the last move
  undoMove(column: number): void {
    for (let i = 0; i <= 5; i++) {
      if (this.board[i][column] !== "") {
        this.board[i][column] = "";
        break;
      }
    }
    this.turn = this.turn === 0 ? 1 : 0;
    if (!this.possibleMoves.includes(column)) {
      this.possibleMoves.push(column);
    }
    this.possibleMoves = this.moveOrder.filter((element) =>
      this.possibleMoves.includes(element)
    );
    this.moves--;
  }
  resetGame(): void {
    this.board = [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ];
    this.turn = 0;
    this.moves = 0;
    this.possibleMoves = [3, 2, 4, 1, 5, 6, 0];
  }
}

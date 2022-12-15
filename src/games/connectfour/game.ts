import Long from "long";
export class ConnectFour {
  private bitboards: Long[];
  private height: number[];
  private counter: number;
  private moves: number[];
  private moveOrder: number[];
  public possibleMoves: number[];

  constructor() {
    // create empty board
    this.height = [0, 7, 14, 21, 28, 35, 42];
    this.bitboards = [Long.UZERO, Long.UZERO];
    this.counter = 0;
    this.moves = [];
    this.possibleMoves = [3, 2, 4, 1, 5, 6, 0];
    this.moveOrder = [3, 2, 4, 1, 5, 6, 0];
  }
  canPlay(column: number): boolean {
    const TOP = new Long(
      0b1000000_1000000_1000000_1000000_1000000_1000000_1000000
    );
    return TOP.and(Long.UONE.shiftLeft(this.height[column])).equals(0);
  }
  // makeMove: given a column, place a piece in that columns
  makeMove(column: number): void {
    let move = Long.UONE.shiftLeft(this.height[column]++); // (1)
    this.bitboards[this.counter & 1] =
      this.bitboards[this.counter & 1].xor(move); // (2)
    this.moves[this.counter++] = column; // (3)
    this.possibleMoves = this.getPossibleMoves();
    /* console.log(
      `column: ${column} height: ${
        this.height
      } move: ${move} \n\nbitboard X: ${this.dec2bin(
        this.bitboards[0].toNumber()
      )} \nbitboard Y: ${this.dec2bin(
        this.bitboards[1].toNumber()
      )}\n\n moves: ${this.moves}`
    ); */
  }
  getPossibleMoves() {
    const moves: number[] = [];
    const TOP = new Long(
      0b1000000_1000000_1000000_1000000_1000000_1000000_1000000
    );
    for (let col = 0; col <= 6; col++) {
      if (TOP.and(Long.UONE.shiftLeft(this.height[col])).equals(0))
        moves.push(col);
    }
    let moves2 = this.moveOrder.filter((move) => moves.includes(move));
    return moves2;
  }
  public getBoard(player: number) {
    return this.bitboards[player].toString();
  }
  public getBoardPrint() {
    let board = [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ];
    let rows = [5, 5, 5, 5, 5, 5, 5];
    for (let i = 0; i < this.counter; i++) {
      let move = this.moves[i];
      if (i & 1) {
        board[rows[move]][move] = "Yellow";
      } else {
        board[rows[move]][move] = "Red";
      }
      if (rows[move] !== 0) {
        rows[move]--;
      }
    }
    return board;
  }
  public getTurn() {
    return this.counter & 1;
  }
  isWin(bitboard: Long) {
    const directions: number[] = [1, 7, 6, 8];
    let bb: Long;
    for (const direction of directions) {
      bb = bitboard.and(bitboard.shiftRightUnsigned(direction));
      if (!bb.and(bb.shiftRightUnsigned(2 * direction)).equals(0)) {
        return true;
      }
    }
    return false;
  }
  // isGameOver: check if the game is over by checking for a winner
  isGameOver(): boolean {
    let result =
      this.isWin(this.bitboards[0]) ||
      this.isWin(this.bitboards[1]) ||
      this.counter === 42;
    return result;
  }
  info() {
    console.log(
      `\n\nbitboard X: ${this.dec2bin(
        this.bitboards[0].toNumber()
      )}\n bitboard Xnum: ${this.bitboards[0].toString()} \nbitboard Y: ${this.dec2bin(
        this.bitboards[1].toNumber()
      )}\n bitboard Ynum: ${this.bitboards[1].toString()}\n\n`
    );
  }
  dec2bin(dec: number) {
    return (dec >>> 0)
      .toString(2)
      .split("")
      .reverse()
      .join("")
      .replace(/(.{7})/g, "$1 ")
      .split("")
      .reverse()
      .join("");
  }
  // getScore
  getScore(): number {
    //Check rows
    let score = 0;
    if (this.isWin(this.bitboards[0])) score = 22 - (1 - this.counter / 2);
    if (this.isWin(this.bitboards[1])) score = -(22 - (1 - this.counter / 2));
    return score;
  }

  // undoMove: remove the last move
  undoMove(column: number): void {
    const col = this.moves[--this.counter]; // reverses (3)
    let move = Long.UONE.shiftLeft(--this.height[col]); // reverses (1)
    this.bitboards[this.counter & 1] =
      this.bitboards[this.counter & 1].xor(move); // reverses (2)
    this.possibleMoves = this.getPossibleMoves();
  }
  resetGame(): void {
    this.height = [0, 7, 14, 21, 28, 35, 42];
    this.bitboards = [Long.UZERO, Long.UZERO];
    this.counter = 0;
    this.moves = [];
    this.possibleMoves = [3, 2, 4, 1, 5, 6, 0];
  }
}

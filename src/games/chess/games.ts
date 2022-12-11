export type Piece = "pawn" | "rook" | "bishop" | "knight" | "queen" | "king";

export type Board = ({ Piece: Piece; color: string } | null)[][];

export type Move = [number, number, number, number];

export type Turn = "white" | "black";

export type Score = {
  white: number;
  black: number;
};

export class ChessGame {
  board: Board;
  turn: Turn;
  possibleMoves: Move[];

  constructor(board: Board, turn: Turn, possibleMoves: Move[]) {
    this.board = board;
    this.turn = turn;
    this.possibleMoves = possibleMoves;
  }

  makeMove(move: Move): void {
    // TODO: implement this
  }

  undoMove(): void {
    // TODO: implement this
  }

  isGameOver(): boolean {
    // TODO: implement this
    return false;
  }

  getScore(): number {
    // TODO: implement this
    return 0;
  }

  resetGame(): void {
    // TODO: implement this
  }
}

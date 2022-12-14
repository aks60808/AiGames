import { TicTacToe } from "../../games/tictactoe/game";

describe("TicTacToe", () => {
  let game: TicTacToe;

  beforeEach(() => {
    game = new TicTacToe();
  });

  test("should have an empty board at the start of the game", () => {
    expect(game.getBoard()).toEqual([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  });

  test("should be player X's turn at the start of the game", () => {
    expect(game.getTurn()).toBe(0);
  });

  test("should make a move and switch turns", () => {
    game.makeMove({ x: 0, y: 0 });
    expect(game.getBoard()).toEqual([
      ["X", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    expect(game.getTurn()).toBe(1);
  });
  test("should make a move and undo move", () => {
    game.makeMove({ x: 0, y: 0 });
    expect(game.getBoard()).toEqual([
      ["X", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    expect(game.getTurn()).toBe(1);
    game.undoMove({ x: 0, y: 0 });
    expect(game.getBoard()).toEqual([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    expect(game.getTurn()).toBe(0);
  });
  test("initializes the possible moves array", () => {
    const expectedPossibleMoves = [
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
    expect(game.possibleMoves).toEqual(expectedPossibleMoves);
  });
  test("check is gameOver at start of game", () => {
    expect(game.isGameOver()).toBe(false);
  });
  test("check score in case of Tie", () => {
    game.makeMove({ x: 1, y: 1 });
    game.makeMove({ x: 0, y: 0 });
    game.makeMove({ x: 2, y: 1 });
    game.makeMove({ x: 0, y: 1 });
    game.makeMove({ x: 0, y: 2 });
    game.makeMove({ x: 2, y: 0 });
    game.makeMove({ x: 1, y: 0 });
    game.makeMove({ x: 1, y: 2 });
    game.makeMove({ x: 2, y: 2 });
    expect(game.isGameOver()).toBe(true);
    expect(game.getScore()).toBe(0);
  });
  test("check score in case of X Win", () => {
    game.makeMove({ x: 0, y: 0 });
    game.makeMove({ x: 0, y: 1 });
    game.makeMove({ x: 0, y: 2 });
    game.makeMove({ x: 1, y: 0 });
    game.makeMove({ x: 1, y: 1 });
    game.makeMove({ x: 1, y: 2 });
    game.makeMove({ x: 2, y: 0 });
    game.makeMove({ x: 2, y: 1 });
    game.makeMove({ x: 2, y: 2 });
    expect(game.getScore()).toBe(1);
  });
  test("check score in case of O Win", () => {
    game.makeMove({ x: 0, y: 0 });
    game.makeMove({ x: 0, y: 1 });
    game.makeMove({ x: 0, y: 2 });
    game.makeMove({ x: 1, y: 1 });
    game.makeMove({ x: 1, y: 2 });
    game.makeMove({ x: 2, y: 1 });
    game.makeMove({ x: 2, y: 2 });
    expect(game.getScore()).toBe(-1);
  });
  test("check reset Game", () => {
    game.makeMove({ x: 0, y: 0 });
    expect(game.getBoard()).toEqual([
      ["X", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    game.resetGame();
    expect(game.getBoard()).toEqual([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  });
});

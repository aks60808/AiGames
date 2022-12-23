import { Board } from "../../search/board";

describe("Board", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board([0, 0], [9, 9]);
    board.createMaze(10, 10);
  });

  it("should create a grid with the given number of rows and columns", () => {
    expect(board.board.length).toEqual(10);
    expect(board.board[0].length).toEqual(10);
  });

  it("should set the start and end positions on the grid", () => {
    expect(board.board[0][0]).toEqual(board.startNum);
    expect(board.board[9][9]).toEqual(board.endNum);
  });

  it("should set the given cell as a wall", () => {
    board.setWall(2, 2);
    expect(board.board[2][2]).toEqual(board.wall);
  });

  it("should clear the visited and path values from the grid", () => {
    board.setVisted(1, 1);
    board.setPath(2, 2);
    board.clearBoard();
    expect(board.board[1][1]).toEqual(-1);
    expect(board.board[2][2]).toEqual(-1);
  });

  it("should set the start position on the grid", () => {
    board.setStart(3, 3);
    expect(board.board[3][3]).toEqual(board.startNum);
  });

  it("should set the end position on the grid", () => {
    board.setEnd(4, 4);
    expect(board.board[4][4]).toEqual(board.endNum);
  });

  it("should set the given cell as visited", () => {
    board.setVisted(5, 5);
    expect(board.board[5][5]).toEqual(board.visited);
  });

  it("should set the given cell as part of the path", () => {
    board.setPath(6, 6);
    expect(board.board[6][6]).toEqual(board.path);
  });
});

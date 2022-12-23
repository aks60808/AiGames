import { Board } from "../../search/board";
import DFS from "../../search/DFS/search";
describe("DFS", () => {
  let board: Board;
  let dfs: DFS;
  beforeEach(() => {
    board = new Board([0, 0], [9, 9]);
    board.createMaze(10, 10);
    dfs = new DFS(board);
  });

  it("should return true if a path is found", () => {
    expect(dfs.search()).toBe(true);
  });

  it("should return false if no path is found", () => {
    board.setWall(0, 1);
    board.setWall(1, 0);
    board.setWall(1, 1);
    board.setWall(9, 8);
    board.setWall(8, 9);
    board.setWall(8, 8);
    expect(dfs.search()).toBe(false);
  });
  it("should return an empty path if no path is found", () => {
    board.setWall(0, 1);
    board.setWall(1, 0);
    board.setWall(1, 1);
    board.setWall(9, 8);
    board.setWall(8, 9);
    board.setWall(8, 8);
    dfs.search();
    expect(dfs.path).toEqual([]);
  });
});

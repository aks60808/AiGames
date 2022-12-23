import { Board } from "../../search/board";
import BFS from "../../search/BFS/search";
describe("BFS", () => {
  let board: Board;
  let bfs: BFS;
  beforeEach(() => {
    board = new Board([0, 0], [9, 9]);
    board.createMaze(10, 10);
    bfs = new BFS(board);
  });

  it("should return true if a path is found", () => {
    expect(bfs.search()).toBe(true);
  });

  it("should return false if no path is found", () => {
    board.setWall(0, 1);
    board.setWall(1, 0);
    board.setWall(1, 1);
    board.setWall(9, 8);
    board.setWall(8, 9);
    board.setWall(8, 8);
    expect(bfs.search()).toBe(false);
  });
  it("should return an empty path if no path is found", () => {
    board.setWall(0, 1);
    board.setWall(1, 0);
    board.setWall(1, 1);
    board.setWall(9, 8);
    board.setWall(8, 9);
    board.setWall(8, 8);
    bfs.search();
    expect(bfs.path).toEqual([]);
  });
});

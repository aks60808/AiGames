import { Board } from "../../search/board";
import Astar from "../../search/AStar/search";

describe("Astar", () => {
  let board: Board;
  let astar: Astar;
  beforeEach(() => {
    board = new Board([0, 0], [9, 9]);
    board.createMaze(10, 10);
    astar = new Astar(board);
  });

  it("should return true if a path is found", () => {
    expect(astar.search()).toBe(true);
  });

  it("should return false if no path is found", () => {
    board.setWall(0, 1);
    board.setWall(1, 0);
    board.setWall(1, 1);
    board.setWall(9, 8);
    board.setWall(8, 9);
    board.setWall(8, 8);
    expect(astar.search()).toBe(false);
  });
  it("should return an empty path if no path is found", () => {
    board.setWall(0, 1);
    board.setWall(1, 0);
    board.setWall(1, 1);
    board.setWall(9, 8);
    board.setWall(8, 9);
    board.setWall(8, 8);
    astar.search();
    expect(astar.path).toEqual([]);
  });
  it("should return a path that does not contain walls", () => {
    board.setWall(4, 4);
    astar.search();
    expect(
      astar.path.some((node) => board.board[node.row][node.col] === board.wall)
    ).toBe(false);
  });
});

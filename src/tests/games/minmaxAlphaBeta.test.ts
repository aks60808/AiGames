import minmaxAlphaBeta from "../../games/minmax";

describe("minmaxAlphaBeta", () => {
  it("dummy test", () => {
    const answer = 1;

    // Call the minmaxAlphaBeta function and check the return value
    expect(answer).toBe(2);
  });
  // it("should return the best move for the current player", () => {
  //   // Create a mock state object with some fake possible moves
  //   const state = {
  //     possibleMoves: [1, 2, 3],
  //     makeMove: jest.fn(),
  //     undoMove: jest.fn(),
  //     isGameOver: jest.fn(() => false),
  //     getScore: jest.fn(() => 5),
  //   };

  //   // Call the minmaxAlphaBeta function and check the return value
  //   expect(minmaxAlphaBeta(state, "Max", 5)).toBe(1);
  // });
});

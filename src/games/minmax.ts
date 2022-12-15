//This function implements the MINMAX algorithm with alpha-beta pruning.
//It takes the current state of the game as an input,
//as well as the current player's turn (X or O).
//The function returns the best move for the current player,
//evaluated using the MINMAX algorithm with alpha-beta pruning.
import { TranspositionTable } from "./transpotionTable";
const table = new TranspositionTable();
function minmaxAlphaBeta(state: any, player: any, maxDepth: any): any {
  // Initialize the best move to null
  console.time("algo");
  let bestMove: any = null;
  let bestScore = 5;
  // Initialize the best score to a very small number
  for (let depth = 1; depth <= maxDepth; depth++) {
    // Initialize the best score to a very small number
    if (player === "Max") {
      bestScore = -Infinity;
    } else {
      bestScore = Infinity;
    }

    // Loop over all possible moves
    for (let move of state.possibleMoves) {
      if (!state.canPlay(move)) continue;

      // Make the move
      state.makeMove(move);

      // Compute the score for this move using null window search
      let score = minmaxAlphaBetaRec(
        state,
        player === "Max" ? "Min" : "Max",
        depth - 1,
        -Infinity,
        Infinity
      );

      // Undo the move
      state.undoMove(move);

      if (player === "Max" && score > bestScore) {
        bestScore = score;
        bestMove = move;
      } else if (player !== "Max" && score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
  }

  console.timeEnd("algo");
  // Return the best move
  console.log(table);
  return bestMove;
}

function minmaxAlphaBetaRec(
  state: any,
  player: any,
  depth: number,
  alpha: number,
  beta: number
): number {
  const storedScore = table.get(state.getBoard(player === "Max" ? 1 : 0));
  let bestScore = 0;
  if (player === "Max") {
    bestScore = -Infinity;
  } else {
    bestScore = Infinity;
  }
  if (storedScore !== undefined) {
    // Return the stored score if it exists
    bestScore = storedScore;
  }
  // If the game is over, return the score
  if (state.isGameOver() || depth === 0) {
    return state.getScore();
  }
  // Initialize the best score to a very small number
  if (player === "Max") {
    // Loop over all possible moves

    for (let move of state.possibleMoves) {
      if (!state.canPlay(move)) continue;
      // Make the move on the board
      state.makeMove(move);

      // Recursively call the MinMax algorithm for the next player
      let score = minmaxAlphaBetaRec(
        state,
        "Min",
        depth - 1,
        bestScore,
        bestScore + 1
      );

      // Take the max score from all the possible moves
      bestScore = Math.max(score, bestScore);
      alpha = Math.max(alpha, bestScore);

      // Undo the move
      state.undoMove(move);

      // Prune branches if alpha >= beta
      if (beta <= alpha) break;
    }
    // Store the computed score in the transposition table
    table.set(state.getBoard(player === "Max" ? 1 : 0), bestScore);
    return bestScore;
  }

  // Minimizing player
  else {
    // Loop over all possible moves
    for (let move of state.possibleMoves) {
      if (!state.canPlay(move)) continue;
      // Make the move on the board
      state.makeMove(move);

      // Recursively call the MinMax algorithm for the next player
      let score = minmaxAlphaBetaRec(
        state,
        "Max",
        depth - 1,
        bestScore - 1,
        bestScore
      );

      // Take the min score from all the possible moves
      bestScore = Math.min(score, bestScore);
      beta = Math.min(beta, bestScore);

      // Undo the move
      state.undoMove(move);

      // Prune branches if alpha >= beta
      if (beta <= alpha) break;
    }
    // Store the computed score in the transposition table
    table.set(state.getBoard(player === "Max" ? 1 : 0), bestScore);
    return bestScore;
  }
}
export default minmaxAlphaBeta;

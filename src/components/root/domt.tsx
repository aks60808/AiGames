import React from "react";
import "./style.css";

const MainPage = () => {
  return (
    <div className="minmax-algorithm">
      <h1>MinMax Alpha Beta Pruning Algorithm</h1>
      <div className="algorithm-intro">
        <p>
          The MinMax Alpha Beta Pruning Algorithm is an artificial intelligence
          technique used in game theory to determine the best possible move to
          make in a game. It uses both Minimax and Alpha Beta Pruning to achieve
          this. It evaluates all possible moves and their consequences, then
          chooses the optimal move that maximizes the chances of winning.
        </p>
        <p>
          The algorithm works by considering all possible moves and their
          consequences, then chooses the move that maximizes the chances of
          winning. It evaluates all possible moves and their consequences, then
          chooses the optimal move that maximizes the chances of winning. It is
          also able to prune away moves that are not beneficial to the player,
          thus reducing the number of moves to evaluate.
        </p>
      </div>
      <div className="algorithm-games">
        <h2>Games You Can Play Against MinMax Alpha Beta Pruning Algorithm</h2>
        <p>
          The MinMax Alpha Beta Pruning Algorithm can be used to play two
          popular games: TicTacToe and ConnectFour. In both of these games, the
          algorithm will evaluate all possible moves and their consequences,
          then choose the move that maximizes the chances of winning. It is also
          able to prune away moves that are not beneficial to the player, thus
          reducing the number of moves to evaluate.
        </p>
      </div>
    </div>
  );
};

export default MainPage;

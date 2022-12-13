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
      <h1>BFS and DFS Algorithms</h1>
      <div className="SearchIntro">
        <p>
          BFS and DFS algorithms are two common methods used to search through a
          maze. Both algorithms have their own unique characteristics and can be
          used to solve different types of problems.
        </p>
      </div>
      <div className="SearchInfo">
        <h2>BFS (Breadth-First Search) Algorithm</h2>
        <p>
          BFS is an algorithm that starts at the starting point of the maze and
          explores all the neighboring nodes (adjacent cells) before moving on
          to the next level of nodes. This means that BFS will always explore
          the entire breadth of a level before moving on to the next level. This
          is useful for finding the shortest path between two points in a maze.
        </p>
      </div>
      <div className="SearchInfo">
        <h2>DFS (Depth-First Search) Algorithm</h2>
        <p>
          DFS is an algorithm that starts at the starting point of the maze and
          explores as far as possible along each branch before backtracking.
          This means that DFS will explore all the possible paths in a maze
          before choosing the best one. This is useful for solving problems that
          require finding all possible solutions or for finding paths with a
          specific property, such as the longest path.
        </p>
      </div>
    </div>
  );
};

export default MainPage;

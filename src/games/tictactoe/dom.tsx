import React from "react";
import { TicTacToe } from "./game";
import minmaxAlphaBeta from "../minmax";
import "./style.css";
interface Props {}

interface State {
  board: string[][];
  turn: number;
  moves: { x: number; y: number }[];
}

class TicTacToeGame extends React.Component<Props, State> {
  ticTacToeGame: TicTacToe;

  constructor(props: Props) {
    super(props);
    this.ticTacToeGame = new TicTacToe();
    this.state = {
      board: this.ticTacToeGame.getBoard(),
      turn: this.ticTacToeGame.getTurn(),
      moves: this.ticTacToeGame.possibleMoves,
    };
  }

  makeMove = (row: number, col: number) => {
    if (this.state.board[row][col] === "" && !this.isGameOver()) {
      this.ticTacToeGame.makeMove({ x: row, y: col });
      this.setState({
        board: this.ticTacToeGame.getBoard(),
        turn: this.ticTacToeGame.getTurn(),
        moves: this.ticTacToeGame.possibleMoves,
      });
      if (!this.isGameOver()) {
        this.ticTacToeGame.makeMove(
          minmaxAlphaBeta(this.ticTacToeGame, "Min", 200)
        );
        this.setState({
          board: this.ticTacToeGame.getBoard(),
          turn: this.ticTacToeGame.getTurn(),
          moves: this.ticTacToeGame.possibleMoves,
        });
      }
    }
  };

  isGameOver = () => {
    return this.ticTacToeGame.isGameOver();
  };

  getScore = () => {
    const score = this.ticTacToeGame.getScore();
    if (score === 1) {
      return "X Won!";
    } else if (score === -1) {
      return "O Won!";
    } else {
      return "You tied";
    }
  };
  resetGame = () => {
    this.ticTacToeGame.resetGame();
    this.setState({
      board: this.ticTacToeGame.getBoard(),
      turn: this.ticTacToeGame.getTurn(),
      moves: this.ticTacToeGame.possibleMoves,
    });
  };
  getPossibleMoves = () => {
    return (
      <div>
        {this.state.moves.map((move) => (
          <div key={`pos${move.x} ${move.y}`}>
            {move.x} {move.y}
          </div>
        ))}
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.isGameOver() && (
          <div className="gameOver">
            <h1>Game Over! </h1>
            <h2>{this.getScore()}</h2>
            <button type="button" onClick={this.resetGame}>
              Reset Game
            </button>
          </div>
        )}
        <div className="gameBoard">
          {this.state.board.map((row, i) =>
            row.map((col, j) => (
              <div
                key={`${i}-${j}`}
                className="gridItem"
                onClick={() => this.makeMove(i, j)}
              >
                {col}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default TicTacToeGame;

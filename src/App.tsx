import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/root/domt";
import ConnectFourGame from "./games/connectfour/dom";
import TicTacToe from "./games/tictactoe/dom";
import SudokuSolver from "./games/soduko/dom";
import SortDom from "./sorting/sorterDom";
import NAVDOM from "./nav";
import "./App.css";
import SEARCHDOM from "./search/searchDom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <NAVDOM />
        <Routes>
          <Route path="AiGames/" element={<MainPage />} />
          <Route path="AiGames/maze/" element={<SEARCHDOM />} />
          <Route path="AiGames/sort/" element={<SortDom />} />
          <Route
            path="AiGames/game/connectfour"
            element={<ConnectFourGame />}
          />
          <Route path="AiGames/game/tictactoe" element={<TicTacToe />} />
          <Route path="AiGames/game/sudoku" element={<SudokuSolver />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

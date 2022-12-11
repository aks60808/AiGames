import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/root/domt";
import ConnectFourGame from "./games/connectfour/dom";
import TicTacToe from "./games/tictactoe/dom";
import Nav from "./nav";
import "./App.css";
import BFSDOM from "./search/BFS/dom";
import DFSDOM from "./search/DFS/dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/maze/BFS" element={<BFSDOM />} />
          <Route path="/maze/DFS" element={<DFSDOM />} />
          <Route path="/game/connectfour" element={<ConnectFourGame />} />
          <Route path="/game/tictactoe" element={<TicTacToe />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

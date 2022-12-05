import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/root/domt";
import ConnectFourGame from "./games/connectfour/dom";
import TicTacToe from "./games/tictactoe/dom";
import Nav from "./nav";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/game/connectfour" element={<ConnectFourGame />} />
          <Route path="/game/tictactoe" element={<TicTacToe />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

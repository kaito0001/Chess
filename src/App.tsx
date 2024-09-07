import React, { useState } from "react";
import {
  initialBlackTeam,
  initialWhiteTeam,
  initialBoard,
} from "./InitialData";
import Board from "./components/Board";

export default function App() {
  const [whiteTeam, setWhiteTeam] = useState(initialWhiteTeam);
  const [blackTeam, setBlackTeam] = useState(initialBlackTeam);
  const [board, setBoard] = useState(initialBoard);

  return (
    <div className="App">
      <Board />
    </div>
  );
}

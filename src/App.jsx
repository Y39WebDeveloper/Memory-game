import { useContext } from "react";
import "./App.css";
import { Game, StartGame } from "./Components";
import { GameContext } from "./Context/GameContext";

function App() {
  const { screen } = useContext(GameContext);
  return (
    <>
      {screen === "start" && <StartGame />}
      {screen === "game" && <Game />}
      {(screen === "game" || screen==="gameover" ) && <Game />}
    </>
  );
}

export default App;

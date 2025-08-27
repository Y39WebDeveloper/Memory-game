import { useContext } from "react";
import { GameInfoMulti, GameOverMulti } from "../";
import "./GameMulti.css";
import { GameContext } from "../../Context/GameContext";

function GameMulti() {
  const {screen} = useContext(GameContext)
  return (
    <>
      <GameInfoMulti />
      {screen==="gameover" && <GameOverMulti />}
    </>
  );
}

export default GameMulti;

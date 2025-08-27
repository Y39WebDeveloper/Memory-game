import { useContext, useEffect } from "react";
import { GameInfoSolo, GameOverSolo } from "../";
import "./GameSolo.css";
import { GameContext } from "../../Context/GameContext";

function GameSolo() {
  const {setTime,screen} = useContext(GameContext);

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setTime((prev) => {
        if (prev.sec === 59) {
          return { min: prev.min + 1, sec: 0 };
        } else {
          return { ...prev, sec: prev.sec + 1 };
        }
      });
    }, 1000);
    if (screen !== "game") {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [screen]);

  return (
    <>
      <GameInfoSolo />
      {screen==="gameover" && <GameOverSolo />}
    </>
  );
}

export default GameSolo;

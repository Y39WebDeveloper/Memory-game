import { useContext, useEffect } from "react";
import {
  GameBoard,
  GameMulti,
  GameSolo,
  MenuBar,
} from "../";
import "./Game.css";
import { SettingsContext } from "../../Context/SettingsContext";
import { GameContext } from "../../Context/GameContext";

function Game() {
  const { settings } = useContext(SettingsContext);
  const { setTime, setMoves } = useContext(GameContext);

  useEffect(() => {
    setTime({ min: 0, sec: 0 });
    setMoves(0);
  }, []);
  return (
    <div className="game">
      <MenuBar />
      <GameBoard
        size={settings.size === "6x6" ? 6 : 4}
      />
      {settings.players === "1" ? (
        <GameSolo />
      ) : (
        <GameMulti />
      )}
    </div>
  );
}

export default Game;

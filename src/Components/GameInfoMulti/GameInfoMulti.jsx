import { useContext, useEffect } from "react";
import { SettingsContext } from "../../Context/SettingsContext";
import "./GameInfoMulti.css";
import { GameContext } from "../../Context/GameContext";

function GameInfoMulti() {
  const { settings } = useContext(SettingsContext);
  const { players, setPlayersData } = useContext(GameContext);

  useEffect(() => {
    setPlayersData(settings.players);
  }, []);

  let playersInfo = players.map((p) => (
    <Player key={p.player} active={p.active} index={p.player} score={p.score} />
  ));

  return <div className="game-info-multi">{playersInfo}</div>;
}

export default GameInfoMulti;

function Player({ active, index, score }) {
  return (
    <div className={active ? "player active" : "player"}>
      <h6 className="mobile">P{index}</h6>
      <h6>Player {index}</h6>
      <span>{score}</span>
    </div>
  );
}

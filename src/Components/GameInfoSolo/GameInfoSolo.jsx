import { useContext } from "react";
import "./GameInfoSolo.css";
import { GameContext } from "../../Context/GameContext";

function GameInfoSolo() {
  const { moves, time } = useContext(GameContext);

  return (
    <div className="game-info-solo">
      <div>
        <h6>Time:</h6>
        <span>
          {time.min}:{time.sec <= 9 ? "0" + time.sec : time.sec}
        </span>
      </div>
      <div>
        <h6>Moves:</h6>
        <span>{moves}</span>
      </div>
    </div>
  );
}

export default GameInfoSolo;

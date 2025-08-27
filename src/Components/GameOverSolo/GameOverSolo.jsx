import { useContext } from "react";
import { GameContext } from "../../Context/GameContext";
import "./GameOverSolo.css";

function GameOverSolo() {
  const { time, moves, handleNewGame, handleRestartGame } = useContext(GameContext);
  

  return (
    <div className="game-over-solo">
      <div className="container">
        <div className="head">
          <h4>You did it!</h4>
          <p>Game over! Here’s how you got on…</p>
        </div>
        <div className="result">
          <div className="line">
            <h6>Time Elapsed</h6>
            <span>{time.min}:{time.sec <= 9 ? "0" + time.sec : time.sec}</span>
          </div>
          <div className="line">
            <h6>Moves Taken</h6>
            <span>{moves} Moves</span>
          </div>
        </div>
        <div className="btns">
          <button className="btn btn-primary" onClick={handleRestartGame}>Restart</button>
          <button className="btn btn-secondary" onClick={handleNewGame}>Setup New Game</button>
        </div>
      </div>
    </div>
  );
}

export default GameOverSolo;

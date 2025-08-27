import "./GameBoard.css";
import { Case } from "../";
import { useContext } from "react";
import { GameContext } from "../../Context/GameContext";

function GameBoard({ size = 6 }) {
  const { casesData } = useContext(GameContext);

  const cases = casesData.map((c) => {
    return (
      <Case
        key={c.id}
        id={c.id}
        content={c.content}
        state={c.state}
      />
    );
  });
  document.documentElement.style.setProperty("--game-board-size", size);

  return <div className="game-board">{cases}</div>;
}

export default GameBoard;

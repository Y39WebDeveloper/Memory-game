import { useContext } from "react";
import "./GameOverMulti.css";
import { GameContext } from "../../Context/GameContext";

function GameOverMulti() {

  const {players,handleRestartGame, handleNewGame} = useContext(GameContext)
  let playersSorted = [...players]
  for(let i=0; i < playersSorted.length; i++){
    for(let j = i; j<playersSorted.length; j++){
      let score1 = playersSorted[i].score
      let score2 = playersSorted[j].score
      if(score2>=score1){
        let a = playersSorted[j]
        playersSorted[j] = playersSorted[i]
        playersSorted[i] = a
      }
    }
  }
  console.log(players)

  const PlayerLineList = playersSorted.map((p,i)=><PlayerLine key={p.player} palyer={p.player} result={p.score} winner={i==0 || p.score==playersSorted[0].score} />)


  return (
    <div className="game-over-multi">
      <div className="container">
        <div className="head">
          <h4>{playersSorted[0].score==playersSorted[1].score? "It’s a tie!" : `Player ${playersSorted[0].player} Wins!`}</h4>
          <p>Game over! Here are the results…</p>
        </div>
        <div className="result">
          {PlayerLineList}
        </div>
        <div className="btns">
          <button className="btn btn-primary" onClick={handleRestartGame}>Restart</button>
          <button className="btn btn-secondary" onClick={handleNewGame}>Setup New Game</button>
        </div>
      </div>
    </div>
  );
}

export default GameOverMulti;

function PlayerLine({ palyer, winner = false, result }) {
  return (
    <div className={winner ? "line active" : "line"}>
      <h6>
        Player {palyer} {winner ? "(Winner!)" : ""}
      </h6>
      <span>{result} Pairs</span>
    </div>
  );
}

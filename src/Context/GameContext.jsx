import { createContext, useContext, useState } from "react";
import { SettingsContext } from "./SettingsContext";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon7,
  Icon8,
  Icon9,
  Icon10,
} from "../assets/icons";

const GameContext = createContext({});

const GameState = ({ children }) => {
  const [screen, setScreen] = useState("start");
  const [casesData, setCaseData] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState({ min: 0, sec: 0 });
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const { settings } = useContext(SettingsContext);

  function handleNewGame() {
    setScreen("start");
  }
  function handleRestartGame() {
    setCaseData(
      casesData.map((c) => {
        return { ...c, state: "unactive" };
      })
    );
    setScreen("start");
    setScreen("game");
    setTime({ min: 0, sec: 0 });
    setMoves(0);
    if (settings.players > 1) {
      setPlayersData(settings.players);
      setCurrentPlayer(1);
    }
  }

  function handleCaseClick(id, state) {
    let isOneActive = casesData.filter((c) => c.state === "active").length > 0;
    if (
      state === "find" ||
      casesData.filter((c) => c.state === "active").length > 1 ||
      casesData.filter((c) => c.state === "active")[0]?.id === id
    ) {
      return;
    } else if (state === "unactive" && !isOneActive) {
      const newCases = casesData.map((c) => {
        if (c.id === id) {
          return { ...c, state: "active" };
        }
        return c;
      });
      setCaseData(newCases);
    } else if (
      state === "unactive" &&
      isOneActive &&
      casesData[id].content ==
        casesData.filter((c) => c.state === "active")[0].content
    ) {
      const newCases = casesData.map((c) => {
        if (c.id === id || c.state === "active") {
          return { ...c, state: "find" };
        }
        return c;
      });
      setCaseData(newCases);
      // setMoves((prev) => prev + 1);
      return "success";
    } else {
      const newCases = casesData.map((c) => {
        if (c.id === id) {
          return { ...c, state: "active" };
        }
        return c;
      });
      setCaseData(newCases);
      // setMoves((prev) => prev + 1);
      setTimeout(() => {
        const newCases = casesData.map((c) => {
          if (c.state !== "find") {
            return { ...c, state: "unactive" };
          }
          return c;
        });
        setCaseData(newCases);
      }, 1000);
      return "failed";
    }
  }
  function handleCaseClickSolo(id, state) {
    if (
      handleCaseClick(id, state) == "success" ||
      handleCaseClick(id, state) == "failed"
    ) {
      setMoves((prev) => prev + 1);
    } else {
      return;
    }
  }
  function handleCaseClickMulti(id, state) {
    if (handleCaseClick(id, state) == "success") {
      const updatedPlayers = players.map((p) => {
        return {
          ...p,
          score: p.player == currentPlayer ? p.score + 1 : p.score,
        };
      });
      setPlayers(updatedPlayers);
    } else if (handleCaseClick(id, state) == "failed") {
      setCurrentPlayer((prev) => (prev >= players.length ? 1 : prev + 1));
      const updatedPlayers = players.map((p) => {
        return {
          ...p,
          active:
            currentPlayer >= players.length && p.player == 1
              ? true
              : p.player == currentPlayer + 1
              ? true
              : false,
        };
      });
      setPlayers(updatedPlayers);
    } else {
      setPlayers(players);
    }
  }

  function setPlayersData(x) {
    const updatedPlayers = [];
    for (let i = 0; i < x; i++) {
      const newplayer = {
        player: i + 1,
        score: 0,
        active: i == 0 ? true : false,
      };
      updatedPlayers.push(newplayer);
    }
    setPlayers(updatedPlayers);
  }

  return (
    <GameContext.Provider
      value={{
        screen,
        setScreen,
        casesData,
        setCaseData,
        moves,
        setMoves,
        time,
        setTime,
        handleNewGame,
        handleRestartGame,
        handleCaseClickSolo,
        handleCaseClickMulti,
        players,
        setPlayers,
        setPlayersData,
        currentPlayer,
        setCurrentPlayer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameState };

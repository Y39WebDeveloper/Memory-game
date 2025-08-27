import { useContext } from "react";
import "./StartGame.css";
import { SettingsContext } from "../../Context/SettingsContext";
import { GameContext } from "../../Context/GameContext";

function StartGame() {
  const { settings, setSettings } = useContext(SettingsContext);
  const { setScreen } = useContext(GameContext);

  function handleThemeChange(e) {
    setSettings({ ...settings, theme: e.target.value });
  }
  function handlePlayersChange(e) {
    setSettings({ ...settings, players: e.target.value });
  }
  function handleSizeChange(e) {
    setSettings({ ...settings, size: e.target.value });
  }
  function handleStartBtn() {
    setScreen("game");
  }
  //===============================================================================================
  //===============================================================================================
  //===============================================================================================

  function randomInt(max) {
    return Math.round(Math.random() * max);
  }
  const size = settings.size === "6x6" ? 6 : 4;
  const s = (size * size) / 2;
  const { setCaseData } = useContext(GameContext);

  function aaa() {
    const numbersData = Array.from({ length: 18 }, (_, i) => i);
    const initianIconsIndexData = Array.from({ length: 10 }, (_, i) => i);
    const iconsIndexDataFull = [];
    do {
      const x =
        initianIconsIndexData[randomInt(initianIconsIndexData.length - 1)];
      if (iconsIndexDataFull.includes(x)) {
        continue;
      }
      iconsIndexDataFull.push(x);
    } while (iconsIndexDataFull.length < 8);
    const iconsIndexData = initianIconsIndexData.concat(iconsIndexDataFull);

    const randomIndexData = [];
    const randomIndexData2 = [];

    if (settings.size === "6x6") {
      do {
        const el = iconsIndexData[randomInt(iconsIndexData.length - 1)];
        const x = randomIndexData.filter((e) => e === el).length;
        if (iconsIndexDataFull.includes(el) && x > 1) {
          continue;
        } else if (
          randomIndexData.includes(el) &&
          !iconsIndexDataFull.includes(el)
        ) {
          continue;
        }
        randomIndexData.push(el);
      } while (randomIndexData.length < s);
    } else {
      do {
        const x =
          initianIconsIndexData[randomInt(initianIconsIndexData.length - 1)];
        if (randomIndexData.includes(x)) {
          continue;
        }
        randomIndexData.push(x);
      } while (randomIndexData.length < s);
    }

    if (settings.size === "6x6") {
      do {
        const el = randomIndexData[randomInt(randomIndexData.length - 1)];
        const x = randomIndexData2.filter((e) => e === el).length;
        if (iconsIndexDataFull.includes(el) && x <= 3) {
          randomIndexData2.push(el);
        } else if (!iconsIndexDataFull.includes(el) && x <= 1) {
          randomIndexData2.push(el);
        } else {
          continue;
        }
      } while (randomIndexData2.length < s * 2);
    } else {
      do {
        const el = randomIndexData[randomInt(randomIndexData.length - 1)];
        const x = randomIndexData2.filter((e) => e === el).length;
        if (x <= 1) {
          randomIndexData2.push(el);
        } else {
          continue;
        }
      } while (randomIndexData2.length < s * 2);
    }

    const randomData = [];
    const randomData2 = [];

    do {
      const x = numbersData[randomInt(numbersData.length - 1)];
      if (randomData.includes(x)) {
        continue;
      }
      randomData.push(x);
    } while (randomData.length < s);

    do {
      const el = randomData[randomInt(randomData.length - 1)];
      const x = randomData2.filter((e) => e === el).length;
      if (x <= 1) {
        randomData2.push(el);
      } else {
        continue;
      }
    } while (randomData2.length < s * 2);

    const updatedCasesData = [];
    for (let i = 0; i < size * size; i++) {
      updatedCasesData.push({
        id: i,
        content:
          settings.theme === "icons" ? randomIndexData2[i] : randomData2[i],
        state: "unactive",
      });
    }
    setCaseData(updatedCasesData);
    setScreen("game");
  }

  //===============================================================================================
  //===============================================================================================
  //===============================================================================================

  return (
    <div className="start-game">
      <h3>Memory</h3>
      <div className="container">
        <div className="selections">
          <fieldset>
            <h6>Select Theme</h6>
            <div className="selection selection-theme">
              <InputRadio
                label={"Numbers"}
                value={"numbers"}
                name={"theme"}
                state={settings.theme}
                setState={handleThemeChange}
              />
              <InputRadio
                label={"Icons"}
                value={"icons"}
                name={"theme"}
                state={settings.theme}
                setState={handleThemeChange}
              />
            </div>
          </fieldset>
          <fieldset id="fff">
            <h6>Select Players</h6>
            <div className="selection selection-players">
              <InputRadio
                label={"1"}
                value={1}
                name={"players"}
                state={settings.players}
                setState={handlePlayersChange}
              />
              <InputRadio
                label={"2"}
                value={2}
                name={"players"}
                state={settings.players}
                setState={handlePlayersChange}
              />
              <InputRadio
                label={"3"}
                value={3}
                name={"players"}
                state={settings.players}
                setState={handlePlayersChange}
              />
              <InputRadio
                label={"4"}
                value={4}
                name={"players"}
                state={settings.players}
                setState={handlePlayersChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <h6>Select Size</h6>
            <div className="selection">
              <InputRadio
                label={"4x4"}
                value={"4x4"}
                name={"size"}
                state={settings.size}
                setState={handleSizeChange}
              />
              <InputRadio
                label={"6x6"}
                value={"6x6"}
                name={"size"}
                state={settings.size}
                setState={handleSizeChange}
              />
            </div>
          </fieldset>
        </div>
        <button className="start-btn" onClick={aaa}>
          Start Game
        </button>
      </div>
    </div>
  );
}

export default StartGame;

function InputRadio({ label, value, name, state, setState }) {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        checked={state == value}
        onChange={setState}
      />
      <div className="input">{label}</div>
    </label>
  );
}

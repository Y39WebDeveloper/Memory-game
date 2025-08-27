import { useContext, useEffect, useState } from "react";
import "./Case.css";
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
} from "../../assets/icons";
import { GameContext } from "../../Context/GameContext";
import { SettingsContext } from "../../Context/SettingsContext";

const iconsData = [
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
];

function Case({ id, content, state }) {

  const {settings} = useContext(SettingsContext)
  const size = settings.size == "6x6" ? 6 : 4;

  
  const [fontSize, setFontSize] = useState("24px");
  const [iconSize, setIconSize] = useState("35px");
  const { casesData, setScreen, handleCaseClickSolo, handleCaseClickMulti } = useContext(GameContext);

  let x = false;
  for (let i = 0; i < casesData.length; i++) {
    if (casesData[i].state !== "find") {
      x = true;
      break;
    }
  }
  useEffect(() => {
    if (!x) {
      setScreen("gameover");
    }
  }, [casesData]);


  function handleCaseClick(id, state) {
    if(settings.players <= 1){
      handleCaseClickSolo(id,state)
    }else{
      handleCaseClickMulti(id,state)
    }
  }

  useEffect(() => {
    const handleFontSize = () => {
      if (window.innerWidth < 768) {
        setFontSize(size === 6 ? "24px" : "40px");
      } else {
        setFontSize(size === 6 ? "44px" : "56px");
      }
    };
    window.addEventListener("resize", handleFontSize);
    handleFontSize();

    return () => window.removeEventListener("resize", handleFontSize);
  }, []);

  useEffect(() => {
    const handleIconSize = () => {
      if (window.innerWidth < 768) {
        setIconSize(size === 6 ? "25px" : "35px");
      } else {
        setIconSize(size === 6 ? "40px" : "56px");
      }
    };
    window.addEventListener("resize", handleIconSize);
    handleIconSize();

    return () => window.removeEventListener("resize", handleIconSize);
  }, []);

  return (
    <span
      className={
        state === "active"
          ? "case current"
          : state === "find"
          ? "case active"
          : "case"
      }
      style={{ fontSize: fontSize }}
      onClick={() => {
        handleCaseClick(id, state);
      }}
    >
      {settings.theme === "icons" ? (
        <img width={iconSize} src={iconsData[content]} alt="" />
      ) : (
        content
      )}
    </span>
  );
}

export default Case;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GameState } from "./Context/GameContext.jsx";
import { SettingsState } from "./Context/SettingsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingsState>
      <GameState>
        <App />
      </GameState>
    </SettingsState>
  </StrictMode>
);

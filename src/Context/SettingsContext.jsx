import { createContext, useState } from "react";

const SettingsContext = createContext({})

const SettingsState = ({ children }) => {
    const [settings, setSettings] = useState({
        theme: "numbers",
        players: "1",
        size: "4x4",
    });
    return (
        <>
            <SettingsContext.Provider value={{ settings, setSettings }}>
                {children}
            </SettingsContext.Provider>
        </>
    );
}

export {SettingsContext, SettingsState}
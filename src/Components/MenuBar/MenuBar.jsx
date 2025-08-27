import { useContext, useEffect, useState } from "react";
import "./MenuBar.css";
import { GameContext } from "../../Context/GameContext";

function MenuBar() {
    const [showMenu, setShowMenu] = useState(false)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(()=>{
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }
      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    },[])
  return (
    <nav>
      <div className="logo">memory</div>
      <div className="navbar">
        <button className="btn btn-primary menu-btn" onClick={()=>{setShowMenu(true)}}>Menu</button>
        {((isMobile && showMenu) || !isMobile) && <MenuList setShowMenu={setShowMenu} />}
      </div>
    </nav>
  );
}

export default MenuBar;

function MenuList({setShowMenu}) {
  const { handleNewGame, handleRestartGame } = useContext(GameContext);
  return (
    <div className="menu-list">
      <ul>
        <li>
          <button className="btn btn-primary" onClick={handleRestartGame}>Restart</button>
        </li>
        <li>
          <button className="btn btn-secondary" onClick={handleNewGame}>New Game</button>
        </li>
        <li>
          <button className="btn btn-secondary" onClick={()=>{setShowMenu(false)}}>resume Game</button>
        </li>
      </ul>
    </div>
  );
}

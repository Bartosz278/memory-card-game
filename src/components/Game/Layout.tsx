import Board from "./Board";
import Settings from "../Settings/Settings";
import { useGameStore } from "../../store/gameStore";
import styles from "./Layout.module.scss";
import Stats from "../Stats/Stats";
import Button from "../ui/Button";
import StatsPage from "../Stats/StatsPage";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const { isGameLaunched, resetGame } = useGameStore();
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      resetGame();
    }
  }, [location.pathname]);

  return (
    <>
      {isStatsOpen ? (
        <StatsPage setIsStatsOpen={setIsStatsOpen} />
      ) : (
        <>
          <Stats />
          <Button
            style="basic"
            onClick={() =>
              isGameLaunched ? resetGame() : setIsStatsOpen(true)
            }
          >
            {isGameLaunched ? "stop game" : "all attemps"}
          </Button>
          <div className={styles.layout}>
            {isGameLaunched ? (
              <Board setIsStatsOpen={setIsStatsOpen} />
            ) : (
              <Settings />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Layout;

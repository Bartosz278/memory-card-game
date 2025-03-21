import { useGameStore } from "../../store/gameStore.ts";
import Tile from "../Tile/Tile";
import styles from "./Board.module.scss";
import { useEffect } from "react";
import checkImg from "../../assets/images/check.svg";
import ModalWindow from "../ui/ModalWindow";
import Button from "../ui/Button";
import { Statistic } from "../../store/gameState";
import Stats from "../Stats/Stats.tsx";
interface StatsPageProps {
  setIsStatsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Board = ({ setIsStatsOpen }: StatsPageProps) => {
  const {
    difficulty,
    setShuffledTiles,
    prevRevealedTile,
    currentRevealedTile,
    setcurrentRevealedTile,
    setprevRevealedTile,
    toggleReveal,
    toggleMatching,
    replaceMatchedImages,
    setIsComparing,
    isGameLaunched,
    setAttempts,
    attempts,
    setTime,
    resetTime,
    endGame,
    setEndGame,
    statistics,
    setStatistics,
    timeDuration,
    resetGame,
    shuffledTiles,
  } = useGameStore();

  const numberOfCards = {
    easy: 12,
    medium: 16,
    hard: 28,
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isGameLaunched && !endGame) {
      resetTime();
      timer = setInterval(() => {
        setTime();
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameLaunched, endGame]);

  useEffect(() => {
    setprevRevealedTile({ id: null, gameId: null });
    setShuffledTiles(numberOfCards[difficulty]);
    setcurrentRevealedTile({ id: null, gameId: null });
    setAttempts(0);
    setEndGame(false);
    setIsComparing(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, isGameLaunched]);

  useEffect(() => {
    const handleTilesComparison = async () => {
      setIsComparing(true);
      if (prevRevealedTile?.id && currentRevealedTile?.id) {
        if (prevRevealedTile.gameId === currentRevealedTile.gameId) {
          toggleMatching(currentRevealedTile.gameId);
          replaceMatchedImages(checkImg);
          toggleReveal(prevRevealedTile.id);
          toggleReveal(currentRevealedTile.id);
          setAttempts(attempts + 1);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          toggleReveal(prevRevealedTile.id);
          toggleReveal(currentRevealedTile.id);
          setAttempts(attempts + 1);
        }
        setprevRevealedTile({ id: null, gameId: null });
        setcurrentRevealedTile({ id: null, gameId: null });
        setprevRevealedTile({ id: null, gameId: null });
      }
      setIsComparing(false);
    };
    handleTilesComparison();
    if (
      shuffledTiles.length > 0 &&
      !shuffledTiles.find((element) => element.isMatched === false)
    ) {
      const attempt: Statistic["attempt"] = {
        id: statistics.length + 1,
        timeDuration: timeDuration,
        numOfAttempts: attempts,
        date: new Date().toLocaleDateString("pl-PL"),
      };

      if (!statistics.find((el) => el.id === attempt.id)) {
        setStatistics(attempt);
      }
      setEndGame(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRevealedTile, prevRevealedTile]);

  return (
    
    
    <div className={`${styles.board} ${styles[difficulty]}`}>
      {endGame ? (
        <ModalWindow>
          {" "}
          <h3>Game won</h3>
          <Stats />
          <Button style="primary" onClick={resetGame}>
            Play again
          </Button>
          <p className={styles.small} onClick={() => setIsStatsOpen(true)}>
            <u>show all attempts</u>
          </p>
        </ModalWindow>
      ) : (
        shuffledTiles.map((tile) => <Tile key={tile.id} tile={tile} />)
      )}
    </div>
    
  );
};

export default Board;

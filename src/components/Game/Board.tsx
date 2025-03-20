import { useGameStore } from "../../store/gameStore.ts";
import Tile from "../Tile/Tile";
import styles from "./Board.module.scss";
import { useEffect } from "react";
import checkImg from "../../assets/images/check.svg";
import ModalWindow from "../ui/ModalWindow";
import Button from "../ui/Button";
import { Statistic } from "../../store/gameStore.ts";
import Stats from "../Stats/Stats.tsx";

const Board = ({ setIsStatsOpen }) => {
  const {
    difficulty,
    setShuffledTiles,
    prevTile,
    currentTile,
    setCurrentTile,
    setPrevTile,
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
  }, [isGameLaunched, endGame]);

  useEffect(() => {
    setPrevTile({ id: null, gameId: null });
    setShuffledTiles(numberOfCards[difficulty]);
    setCurrentTile({ id: null, gameId: null });
    setAttempts(0);
    setEndGame(false);
    setIsComparing(false);
  }, [difficulty, isGameLaunched]);

  useEffect(() => {
    const handleTilesComparison = async () => {
      setIsComparing(true);
      if (prevTile?.id && currentTile?.id) {
        if (prevTile.gameId === currentTile.gameId) {
          toggleMatching(currentTile.gameId);
          replaceMatchedImages(checkImg);
          toggleReveal(prevTile.id);
          toggleReveal(currentTile.id);
          setAttempts(attempts + 1);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          toggleReveal(prevTile.id);
          toggleReveal(currentTile.id);
          setAttempts(attempts + 1);
        }
        setPrevTile({ id: null, gameId: null });
        setCurrentTile({ id: null, gameId: null });
        setPrevTile({ id: null, gameId: null });
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
  }, [currentTile, prevTile]);

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

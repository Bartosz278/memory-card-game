import styles from "./Tile.module.scss";
import ReactCardFlip from "react-card-flip";
import blankImg from "../../assets/images/blank.webp";
import { useGameStore } from "../../store/gameStore";

export interface TileProps {
  tile: {
    id: number;
    gameId: number;
    image: string;
    isRevealed: boolean;
    isMatched: boolean;
  };
}

const Tile = ({ tile }: TileProps) => {
  const {
    toggleReveal,
    currentTile,
    prevTile,
    setPrevTile,
    setCurrentTile,
    isComparing,
    difficulty,
  } = useGameStore();

  const isFlipped =
    tile.isRevealed ||
    tile.id === currentTile.id ||
    tile.id === prevTile.id ||
    tile.isMatched;

  const handleTileClick = () => {
    if (tile.isRevealed || isComparing) return;
    setPrevTile(currentTile);
    setCurrentTile(tile);
    toggleReveal(tile.id);
  };

  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection="vertical"
      containerClassName={difficulty == "medium" ? styles.abc : styles.tile}
    >
      <div className={styles.tile} onClick={handleTileClick}>
        <img src={blankImg} alt="Tile front" />
      </div>

      <div className={styles.tile} onClick={handleTileClick}>
        <img src={tile.image} alt="Tile back" />
      </div>
    </ReactCardFlip>
  );
};

export default Tile;

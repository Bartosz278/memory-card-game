import styles from "./Tile.module.scss";
import ReactCardFlip from "react-card-flip";
import blankImg from "../../assets/images/blank.webp";
import { useGameStore } from "../../store/gameStore";
import { TileType } from "../../store/gameState";

interface TileProp {
  tile: TileType;
}

const Tile = ({ tile }: TileProp) => {
  const {
    toggleReveal,
    currentRevealedTile,
    prevRevealedTile,
    setprevRevealedTile,
    setcurrentRevealedTile,
    isComparing,
    difficulty,
  } = useGameStore();

  const isFlipped =
    tile.isRevealed ||
    tile.id === currentRevealedTile.id ||
    tile.id === prevRevealedTile.id ||
    tile.isMatched;

  const handleTileClick = () => {
    if (tile.isRevealed || isComparing) return;
    setprevRevealedTile(currentRevealedTile);
    setcurrentRevealedTile(tile);
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

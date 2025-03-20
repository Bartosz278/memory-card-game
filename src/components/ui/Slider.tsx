import { useState } from "react";
import styles from "./Slider.module.scss";
import { TileProps } from "../Tile/Tile";
import "react-slideshow-image/dist/styles.css";

interface SliderProps {
  tiles: TileProps["tile"][];
  onTileClick: (tileId: number) => void;
}

const Slider = ({ tiles, onTileClick }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.floor(tiles.length / 2) - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === Math.floor(tiles.length / 2) - 1 ? 0 : prev + 1
    );
  };

  const filteredTiles = tiles.filter((_, index) => index % 2 === 0);

  return (
    <div className={styles.slider}>
      <button className={styles.sliderButton} onClick={prevSlide}>
        Prev
      </button>

      <div className={styles.tileContainer}>
        {filteredTiles.slice(currentSlide, currentSlide + 4).map((tile) => (
          <div
            key={tile.id}
            className={styles.tile}
            onClick={() => onTileClick(tile.gameId)}
          >
            <img src={tile.image} alt="Tile" className={styles.tileImage} />
          </div>
        ))}
      </div>

      <button className={styles.sliderButton} onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default Slider;

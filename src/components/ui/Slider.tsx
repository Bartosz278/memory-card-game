import { useState } from "react";
import styles from "./Slider.module.scss";
import { TileProps } from "../Tile/Tile";

interface SliderProps {
  tiles: TileProps['tile'][]; 
  onTileClick: (tileId: number) => void; 
}

const Slider = ({ tiles, onTileClick }:SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? tiles.length - 3 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === tiles.length - 3 ? 0 : prev + 1));
  };

  return (
    <div className={styles.slider}>
      <button className={styles.sliderButton} onClick={prevSlide}>
        Prev
      </button>

      <div className={styles.tileContainer}>
        {tiles.slice(currentSlide, currentSlide + 4).map((tile) => (
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

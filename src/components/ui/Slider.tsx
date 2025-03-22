import { useState, useRef } from "react";
import styles from "./Slider.module.scss";
import "react-slideshow-image/dist/styles.css";
import { TileType } from "../../store/gameState";

interface SliderProps {
  tiles: TileType[];
}

const Slider = ({ tiles }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const uniqueTiles = tiles.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.gameId === value.gameId)
  );

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? uniqueTiles.length - 4 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= uniqueTiles.length - 4 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !startX || !sliderRef.current) return;

    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (diff > 50) {
      nextSlide();
      setIsDragging(false);
    } else if (diff < -50) {
      prevSlide();
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setStartX(null);
  };

  return (
    <div
      className={styles.slider}
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button className={styles.sliderButton} onClick={prevSlide}>
        Prev
      </button>

      <div className={styles.tileContainer}>
        {uniqueTiles.slice(currentSlide, currentSlide + 4).map((tile) => (
          <div key={tile.id} className={styles.tile}>
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

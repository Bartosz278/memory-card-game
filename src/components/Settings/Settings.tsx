import { useGameStore } from "../../store/gameStore";
import Button from "../ui/Button";
import styles from "./Settings.module.scss";
import { useRef } from "react";
import Slider from "../ui/Slider";

const Settings = () => {
  const { toggleLaunch, setDifficulty, addTiles, tiles } =
    useGameStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          addTiles([
            {
              id: Date.now() + Math.random(),
              gameId: tiles.length + 1,
              image: reader.result as string,
              isRevealed: false,
              isMatched: false,
            },
            {
              id: Date.now() + Math.random(),
              gameId: tiles.length + 1,
              image: reader.result as string,
              isRevealed: false,
              isMatched: false,
            },
          ]);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.settings}>
      
      <div className={styles.levels}>
        <Button style={"basic"} onClick={() => setDifficulty("easy")}>
          <p>Easy</p>
        </Button>
        <Button style={"basic"} onClick={() => setDifficulty("medium")}>
          <p>Medium</p>
        </Button>
        <Button style={"basic"} onClick={() => setDifficulty("hard")}>
          <p>Hard</p>
        </Button>
      </div>
      <Button
        style={"primary"}
        customStyle={{ margin: "20px auto" }}
        onClick={() => toggleLaunch(true)}
      >
        <p>Start</p>
      </Button>

      <div>
        <p className={styles.addText}>
          If you want to add your own cards&nbsp;
          <u onClick={handleClick}>
            <b>
              click me
              <input ref={inputRef} type="file" onChange={handleFileChange} />
            </b>
          </u>
        </p>
      </div>

      <Slider tiles={tiles} />
    </div>
  );
};

export default Settings;

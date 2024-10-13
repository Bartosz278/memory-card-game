import { useGameStore } from "../../store/gameStore";
import styles from "./Header.module.scss";

const Header = () => {
  const toggleLaunch = useGameStore(state => state.toggleLaunch);
  return (
    <header className={styles.header} onClick={()=>toggleLaunch(false)}>
      <h2>Memory card matching game</h2>
    </header>
  );
};

export default Header;

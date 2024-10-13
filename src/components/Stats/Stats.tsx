import { useGameStore } from "../../store/gameStore";
import styles from './Stats.module.scss'
const Stats = () => {
  const {attempts, timeDuration} = useGameStore();
  
  return <div className={styles.stats}>
    <p>Attempts: {attempts}</p>
    <p>Time: {Math.floor(timeDuration / 60)}:{String(timeDuration % 60).padStart(2, '0')}</p>
    
  </div>;
};

export default Stats;

import { Statistic } from "../../store/gameState";
import styles from "./AttemptRow.module.scss";

const AttemptRow = ({ attempt }: Statistic) => {
  return (
    <div className={styles.attemptRow}>
      <p> ID:{attempt.id}</p>
      <p> Time:{attempt.timeDuration}</p>
      <p> Number of attempts:{attempt.numOfAttempts}</p>
      <p> Date:{attempt.date}</p>
    </div>
  );
};

export default AttemptRow;

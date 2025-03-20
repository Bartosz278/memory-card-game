import { IoArrowBackOutline } from "react-icons/io5";
import { useGameStore } from "../../store/gameStore";
import AttemptRow from "./AttemptRow";
import styles from "./StatsPage.module.scss";

interface StatsPageProps {
  setIsStatsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const StatsPage = ({ setIsStatsOpen }: StatsPageProps) => {
  const { statistics, resetGame } = useGameStore();

  return (
    <div className={styles.StatsPage}>
      <div
        className={styles.back}
        onClick={() => {
          setIsStatsOpen(false);
          resetGame();
        }}
      >
        <IoArrowBackOutline />
      </div>
      {statistics.map((attempt) => (
        <AttemptRow key={attempt.id} attempt={attempt} />
      ))}
    </div>
  );
};

export default StatsPage;

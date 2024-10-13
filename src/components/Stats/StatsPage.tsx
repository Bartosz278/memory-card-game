import { IoArrowBackOutline } from "react-icons/io5";
import { useGameStore } from "../../store/gameStore";
import AttemptRow from "./AttemptRow";
import styles from './StatsPage.module.scss'

const StatsPage = () =>{
    const {statistics, setIsStatsOpen, resetGame} = useGameStore();
  
    return <div className={styles.StatsPage}>
        <div className={styles.back} onClick={()=>{
            setIsStatsOpen(false)
            resetGame();
            
            }}><IoArrowBackOutline /></div>
        {statistics.map((attempt)=><AttemptRow key={attempt.id} attempt={attempt}/>)}
    </div>
}

export default StatsPage;
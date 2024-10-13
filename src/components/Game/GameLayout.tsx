import Board from "./Board";
import Settings from "../Settings/Settings";
import { useGameStore } from "../../store/gameStore";
import styles from "./Layout.module.scss";
import Header from "../ui/Header";
import Stats from "../Stats/Stats";
import Button from "../ui/Button";
import StatsPage from "../Stats/StatsPage";


const Layout = () => {
  const { isGameLaunched, isStatsOpen,setIsStatsOpen } = useGameStore();
  
  return (
    <>
    {isStatsOpen ? <StatsPage/> : 
    (<>
    <Header />
    <Stats />
    <Button style="basic" onClick={()=>setIsStatsOpen(true)}>Show all attemps</Button>
    <div className={styles.layout}>
      {isGameLaunched ? <Board /> : <Settings />}
  
    </div>
    </>
    )
    }
    </>
  );
};

export default Layout;

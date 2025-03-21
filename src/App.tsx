import Layout from "./components/Game/GameLayout";
import styles from "./styles/index.module.scss";

const App = () => {
  return (
    <>
      <div className={styles.cloud}></div>
      <div className={styles.cloud2}></div>
      <div className={styles.app}>
        <Layout />
      </div>
    </>
  );
};

export default App;

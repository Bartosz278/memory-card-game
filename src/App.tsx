// import Board from "./components/Game/Board";
import Layout from "./components/Game/Layout";
import styles from "./styles/index.module.scss";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className={styles.cloud}></div>
      <div className={styles.cloud2}></div>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/game" element={<Layout />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

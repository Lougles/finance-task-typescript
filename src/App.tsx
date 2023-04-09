import React from 'react';
import {Header} from "./components/Header/Header";
import styles from "./App.module.css";
import {Footer} from "./components/Footer/Footer";
import List from "./components/List/List";

function App() {
  return (
    <div className={styles.App}>
        <Header />
        <List />
        <Footer />
    </div>
  );
}
export default App;

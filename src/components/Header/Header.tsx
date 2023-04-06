import React from "react";
import styles from "./Header.module.css";

export const Header = () => {
    return (
        <header className={styles.container}>
            <h1 className={styles.header}>
                Finance Task Typescript
            </h1>
        </header>
    )
}
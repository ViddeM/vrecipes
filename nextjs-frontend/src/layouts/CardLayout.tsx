import React from "react";

import styles from "./CardLayout.module.scss";

type CardLayoutProps = {
  children: React.ReactNode; // 👈️ define children prop
};

const CardLayout: React.FC<CardLayoutProps> = ({ children }) => {
  return (
    <div>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default CardLayout;

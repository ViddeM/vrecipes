import React from "react";

import styles from "./DefaultLayout.module.scss";

type DefaultLayoutProps = {
  children: React.ReactNode; // 👈️ define children prop
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className={styles.fillWindow}>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default DefaultLayout;

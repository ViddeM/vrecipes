import styles from "./CardLayout.module.scss";

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.fillWindow}>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default DefaultLayout;

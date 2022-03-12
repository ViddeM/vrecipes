import styles from "./CardLayout.module.scss";

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <div>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default DefaultLayout;

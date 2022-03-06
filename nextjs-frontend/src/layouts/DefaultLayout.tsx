import styles from "./DefaultLayout.module.scss";
import Header from "../components/Header";

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.fillWindow}>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default DefaultLayout;

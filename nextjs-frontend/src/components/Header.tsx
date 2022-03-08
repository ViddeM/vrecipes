import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./Buttons";
import { useTranslations } from "../hooks/useTranslations";

const Header = () => {
  const { t } = useTranslations();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={`${styles.logoTitleContainer} ${styles.headerSection}`}>
          <Link href="/">
            <div className={styles.escapeHatch}>
              <Image
                src="/transparent_vrecipes_logo.svg"
                width="46"
                height="46"
              />
            </div>
          </Link>
          <h1>{t.header.pageTitle}</h1>
        </div>
        <div
          className={`${styles.headerActionsContainer} ${styles.headerSection}`}
        >
          <Button variant="opaque" size="normal">
            {t.header.loginButton}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

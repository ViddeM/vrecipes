import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./Buttons";
import { useTranslations } from "../hooks/useTranslations";
import { useMe } from "../hooks/useMe";
import { LOGIN_ENDPOINT } from "../api/Endpoints";

const Header = () => {
  const { t } = useTranslations();
  const { isLoggedIn, logout } = useMe();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={`${styles.logoTitleContainer} ${styles.headerSection}`}>
          <Link href="/">
            <a>
              <div className={styles.escapeHatch}>
                <Image
                  src="/transparent_vrecipes_logo.svg"
                  width="46"
                  height="46"
                />
              </div>
            </a>
          </Link>
          <h1>{t.header.pageTitle}</h1>
        </div>
        <div
          className={`${styles.headerActionsContainer} ${styles.headerSection}`}
        >
          {isLoggedIn ? (
            <Button size="normal" variant="outlined" onClick={logout}>
              {t.header.logoutButton}
            </Button>
          ) : (
            <Link href={LOGIN_ENDPOINT}>
              <a>
                <Button variant="outlined" size="normal">
                  {t.header.loginButton}
                </Button>
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

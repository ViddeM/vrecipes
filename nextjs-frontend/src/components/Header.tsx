import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./Buttons";
import { useTranslations } from "../hooks/useTranslations";
import { useMe } from "../hooks/useMe";
import { LOGIN_ENDPOINT } from "../api/Endpoints";
import { useRouter } from "next/router";

const RECIPES_PATH = "/";
const RECIPEBOOKS_PATH = "/recipebooks";
const TAGS_PATH = "/tags";

const Header = () => {
  const { t } = useTranslations();
  const { isLoggedIn, logout } = useMe();
  const { asPath } = useRouter();

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

      <ul className={styles.subHeader}>
        <li
          className={
            asPath === RECIPES_PATH ? styles.selectedSubHeaderItem : ""
          }
        >
          <Link href={RECIPES_PATH}>
            <a>{t.header.recipes}</a>
          </Link>
        </li>
        <li
          className={
            asPath === RECIPEBOOKS_PATH ? styles.selectedSubHeaderItem : ""
          }
        >
          <Link href={RECIPEBOOKS_PATH}>
            <a>{t.header.recipebooks}</a>
          </Link>
        </li>
        <li
          className={asPath === TAGS_PATH ? styles.selectedSubHeaderItem : ""}
        >
          <Link href={TAGS_PATH}>
            <a>{t.header.tags}</a>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;

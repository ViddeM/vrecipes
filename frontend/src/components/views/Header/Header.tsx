import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  LOGIN_ENDPOINT,
  RECIPE_BOOKS_BASE_ENDPOINT,
  ROOT_ENDPOINT,
  TAGS_BASE_ENDPOINT,
} from "../../../api/Endpoints";
import { useMe } from "../../../hooks/useMe";
import { useTranslations } from "../../../hooks/useTranslations";
import { Button } from "../../elements/Buttons/Buttons";

import styles from "./Header.module.scss";

const Header = () => {
  const { t } = useTranslations();
  const { isLoggedIn, logout } = useMe();
  const { pathname } = useRouter();

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
                  alt={t.common.logoAltText}
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
              <a tabIndex={-1}>
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
            pathname === ROOT_ENDPOINT ? styles.selectedSubHeaderItem : ""
          }
        >
          <Link href={ROOT_ENDPOINT}>
            <a>{t.header.recipes}</a>
          </Link>
        </li>
        <li
          className={
            pathname === RECIPE_BOOKS_BASE_ENDPOINT
              ? styles.selectedSubHeaderItem
              : ""
          }
        >
          <Link href={RECIPE_BOOKS_BASE_ENDPOINT}>
            <a>{t.header.recipebooks}</a>
          </Link>
        </li>
        <li
          className={
            pathname === TAGS_BASE_ENDPOINT ? styles.selectedSubHeaderItem : ""
          }
        >
          <Link href={TAGS_BASE_ENDPOINT}>
            <a>{t.header.tags}</a>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;

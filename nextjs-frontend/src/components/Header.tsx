import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import ButtonBase from "./Buttons";
import TextField from "./TextField";

const Header = () => {
  const {t} = useTranslation();

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={`${styles.logoTitleContainer} ${styles.headerSection}`}>
          <Link href="/">
            <div className={styles.escapeHatch}>
              <Image src="/transparent_vrecipes_logo.svg" width="46" height="46"/>
            </div>
          </Link>
          <h1>
            {t('header.pageTitle')}
          </h1>
        </div>
        <TextField className={styles.headerSection}/>
        <div className={`${styles.headerActionsContainer} ${styles.headerSection}`}>
          <ButtonBase variant='primary' size='normal'>
            {t('header.loginButton')}
          </ButtonBase>
        </div>
      </div>
    </div>
  )
}

export default Header;
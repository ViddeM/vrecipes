import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useTranslations } from "../../hooks/useTranslations";
import Dropdown from "../elements/Dropdown/Dropdown";

import styles from "./Footer.module.scss";

const Footer = () => {
  const { translate, t } = useTranslations();
  const { locales, asPath, query, pathname, push, locale } = useRouter();

  const localeOptions = locales?.map((locale) => {
    return {
      display: translate(`locales.${locale}`),
      value: locale,
    };
  });

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContentContainer}>
        <div className={styles.footerLogoDevelopedByContainer}>
          <Image
            src="/transparent_vrecipes_logo.svg"
            width="46"
            height="46"
            alt={t.common.logoAltText}
          />
          <h3 className={styles.developedByText}>{t.footer.developedBy}</h3>
        </div>
        {localeOptions && (
          <Dropdown
            onUpdate={(locale) =>
              push({ pathname, query }, asPath, { locale: locale })
            }
            options={localeOptions}
            defaultValue={locale}
            className={styles.changeLocaleDropdown}
            visibleSize={"normal"}
            variant={"outlined"}
          />
        )}
        <nav>
          <ul>
            <Link href={"https://github.com/viddem/vrecipes"}>
              <a>
                <FontAwesomeIcon icon={faGithub} /> {t.footer.sourceCode}
              </a>
            </Link>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

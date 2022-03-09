import styles from "./login.module.scss";
import CardLayout from "../layouts/CardLayout";
import { Button } from "../components/Buttons";
import { useTranslations } from "../hooks/useTranslations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Api } from "../api/Api";
import Link from "next/link";

const PROVIDER = "provider";
const PROVIDER_GITHUB = "github";

const Login = () => {
  let { t } = useTranslations();

  return (
    <CardLayout>
      <div className={`card ${styles.loginContainer}`}>
        <h1>{t.login.loginTitle}</h1>

        {/*<Link href={`${PROVIDER}`}>*/}
        {/*  <a>*/}
        <Button
          variant="primary"
          size="large"
          className={`${styles.signInButton} ${styles.githubButton}`}
          onClick={() => {
            Api.login.github();
          }}
        >
          <FontAwesomeIcon
            icon={faGithub}
            className={styles.signInButtonIcon}
          />
          {t.login.loginWithGithub}
        </Button>
        {/*  </a>*/}
        {/*</Link>*/}
      </div>
    </CardLayout>
  );
};

export default Login;

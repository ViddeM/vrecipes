import styles from "./login.module.scss";
import CardLayout from "../layouts/CardLayout";
import { Button } from "../components/Buttons";
import { useTranslations } from "../hooks/useTranslations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Api } from "../api/Api";

const Login = () => {
  let { t } = useTranslations();

  return (
    <CardLayout>
      <div className={`card ${styles.loginContainer}`}>
        <h1>{t.login.loginTitle}</h1>

        <Button
          variant="primary"
          size="large"
          className={`${styles.signInButton} ${styles.githubButton}`}
          onClick={() => {
            Api.user.githubLogin();
          }}
        >
          <FontAwesomeIcon
            icon={faGithub}
            className={styles.signInButtonIcon}
          />
          {t.login.loginWithGithub}
        </Button>
      </div>
    </CardLayout>
  );
};

export default Login;

import styles from "./login.module.scss";
import CardLayout from "../layouts/CardLayout";
import { Button } from "../components/Buttons";
import { useTranslations } from "../hooks/useTranslations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Api } from "../api/Api";
import { useState } from "react";

const Login = () => {
  let { t, translate } = useTranslations();
  let [error, setError] = useState<string | undefined>(undefined);

  return (
    <CardLayout>
      <div className={`card ${styles.loginContainer}`}>
        <h1>{t.login.loginTitle}</h1>

        {error && (
          <div className="errorText marginTop marginBottom">{error}</div>
        )}

        <Button
          variant="primary"
          size="large"
          className={`${styles.signInButton} ${styles.githubButton}`}
          onClick={() => {
            Api.user.githubLogin().then((val) => {
              if (val.errorTranslationString) {
                setError(translate(val.errorTranslationString));
              } else {
                setError(t.errors.default);
              }
            });
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

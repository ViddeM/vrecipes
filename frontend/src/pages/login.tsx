import { useState } from "react";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Api } from "../api/Api";
import { Button } from "../components/elements/Buttons/Buttons";
import { useTranslations } from "../hooks/useTranslations";
import CardLayout from "../layouts/CardLayout";

import styles from "./login.module.scss";

const Login = () => {
  const { t, translate } = useTranslations();
  const [error, setError] = useState<string | undefined>(undefined);

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
              if (val.error) {
                if (val.errorTranslationString) {
                  setError(translate(val.errorTranslationString));
                } else {
                  setError(t.errors.default);
                }
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

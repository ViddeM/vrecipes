import { useState } from "react";

import { faFacebookF, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

import { Api, ApiResponse } from "../api/Api";
import { Button } from "../components/elements/Buttons/Buttons";
import { useTranslations } from "../hooks/useTranslations";
import CardLayout from "../layouts/CardLayout";

import styles from "./login.module.scss";

const Login = () => {
  const { t, translate } = useTranslations();
  const [error, setError] = useState<string | undefined>(undefined);

  const handleLoginResponse = (r: Promise<ApiResponse<unknown>>) => {
    r.then((val) => {
      if (val.error) {
        if (val.errorTranslationString) {
          setError(translate(val.errorTranslationString));
        } else {
          setError(t.errors.default);
        }
      }
    });
  };

  return (
    <CardLayout>
      <div className={`card ${styles.loginContainer}`}>
        <h1>{t.login.loginTitle}</h1>

        {error && (
          <div className="errorText marginTop marginBottom">{error}</div>
        )}

        {/* GITHUB */}
        <Button
          variant="primary"
          size="large"
          className={`${styles.signInButton} ${styles.githubButton}`}
          onClick={() => {
            handleLoginResponse(Api.user.githubLogin());
          }}
        >
          <FontAwesomeIcon
            icon={faGithub}
            className={styles.signInButtonIcon}
          />
          {t.login.loginWithGithub}
        </Button>

        {/* FACEBOOK */}
        <Button
          variant="primary"
          size="large"
          className={`${styles.signInButton} ${styles.facebookButton}`}
          onClick={() => {
            handleLoginResponse(Api.user.facebookLogin());
          }}
        >
          <FontAwesomeIcon
            icon={faFacebookF}
            className={`${styles.signInButtonIcon} ${styles.facebookIcon}`}
          />
          {t.login.loginWithFacebook}
        </Button>

        {/* GOOGLE */}
        <Button
          variant="primary"
          size="large"
          className={`${styles.signInButton} ${styles.googleButton}`}
          onClick={() => {
            handleLoginResponse(Api.user.googleLogin());
          }}
        >
          <div className={styles.signInButtonIcon}>
            <Image
              alt="Google"
              src={"/icon_google.svg"}
              layout={"responsive"}
              width={"16px"}
              height={"16px"}
            />
          </div>
          {t.login.loginWithGoogle}
        </Button>

        {/* MICROSOFT */}
        <Button
          variant="primary"
          size="large"
          className={`${styles.signInButton} ${styles.microsoftButton}`}
          onClick={() => {
            handleLoginResponse(Api.user.microsoftLogin());
          }}
        >
          <div className={styles.signInButtonIcon}>
            <Image
              alt="Microsoft"
              src={"/icon_microsoft.svg"}
              layout={"responsive"}
              width={"16px"}
              height={"16px"}
            />
          </div>
          {t.login.loginWithMicrosoft}
        </Button>

        {/* ACCOUNTS_RS */}
        <Button
          variant="primary"
          size="large"
          className={`${styles.signInButton} ${styles.accountsRsButton}`}
          onClick={() => {
            handleLoginResponse(Api.user.accountsRsLogin());
          }}
        >
          {t.login.loginWithAccountsRS}
        </Button>

        <div className={"space"} />
      </div>
    </CardLayout>
  );
};

export default Login;

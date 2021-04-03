import React, {useState} from "react";
import {
    FacebookLoginButton,
    GithubLoginButton,
    GoogleLoginButton,
    LoginButtonIcon,
    LoginButtonsContainer,
    LoginCard,
    LoginErrorText, MicrosoftLoginButton,
    StyledFacebookIcon
} from "./Login.styles";
import {
    PROVIDER_FACEBOOK,
    PROVIDER_GITHUB,
    PROVIDER_GOOGLE,
    PROVIDER_MICROSOFT
} from "./providers";
import {getAuth} from "../../api/get.Auth.api";
import GitHubIcon from '@material-ui/icons/GitHub';
import {ReactComponent as GoogleIcon} from "../../resources/images/icon_google.svg"
import {ReactComponent as MicrosoftIcon} from "../../resources/images/icon_microsoft.svg"
import {Typography} from "@material-ui/core";


const Login = props => {
    const [error, setError] = useState("");

    return (
        <div>
            <LoginCard>
                <Typography variant="h6">
                    Du behöver vara inloggad för att komma åt denna sida
                </Typography>
                {
                    error === "" ? (
                        <LoginButtonsContainer>
                            <GithubLoginButton onClick={() =>
                                login(PROVIDER_GITHUB, setError)
                            }>
                                <LoginButtonIcon>
                                    <GitHubIcon/>
                                </LoginButtonIcon>
                                Logga in med github
                            </GithubLoginButton>
                            <GoogleLoginButton onClick={() =>
                                login(PROVIDER_GOOGLE, setError)
                            }>
                                <LoginButtonIcon>
                                    <GoogleIcon/>
                                </LoginButtonIcon>
                                Logga in med google
                            </GoogleLoginButton>
                            <FacebookLoginButton onClick={() =>
                                login(PROVIDER_FACEBOOK, setError)
                            }>
                                <LoginButtonIcon>
                                    <StyledFacebookIcon/>
                                </LoginButtonIcon>
                                Logga in med facebook
                            </FacebookLoginButton>
                            <MicrosoftLoginButton onClick={() =>
                                login(PROVIDER_MICROSOFT, setError)
                            }>
                                <LoginButtonIcon>
                                    <MicrosoftIcon/>
                                </LoginButtonIcon>
                                Logga in med Microsoft
                            </MicrosoftLoginButton>
                        </LoginButtonsContainer>
                    ) : (
                        <LoginErrorText>
                            {error}
                        </LoginErrorText>
                    )
                }
            </LoginCard>
        </div>
    )
}

function login(provider, setError) {
    getAuth(provider)
        .then(response => {
            setError("Oväntat svar från servern")
        })
        .catch(error => {
            if (error.response && error.response.status === 401 && error.response.headers && error.response.headers.location) {
                window.location.assign(error.response.headers.location)
            } else {
                setError("Kunde inte logga in")
            }
        })
}

export default Login;
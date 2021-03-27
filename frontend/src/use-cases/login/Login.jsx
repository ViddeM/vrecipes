import React, {useState} from "react";
import {DigitText} from "@cthit/react-digit-components";
import {
    FacebookLoginButton,
    GithubLoginButton,
    GoogleLoginButton,
    LoginButtonIcon,
    LoginButtonsContainer,
    LoginCard,
    LoginErrorText,
    StyledFacebookIcon
} from "./Login.styles";
import {PROVIDER_FACEBOOK, PROVIDER_GITHUB, PROVIDER_GOOGLE} from "./providers";
import {getAuth} from "../../api/get.Auth.api";
import GitHubIcon from '@material-ui/icons/GitHub';
import {ReactComponent as GoogleIcon} from "../../resources/images/icon_google.svg"


const Login = props => {
    const [error, setError] = useState("");

    return (
        <div>
            <LoginCard>
                <DigitText.Title text="Du behöver vara inloggad för att komma åt denna sida"/>
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
            console.log("ERROR", error.response)
            if (error.response && error.response.status === 401 && error.response.headers && error.response.headers.location) {
                window.location.assign(error.response.headers.location)
            } else {
                setError("Kunde inte logga in")
            }
        })
}

export default Login;
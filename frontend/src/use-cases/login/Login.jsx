import React, {useState} from "react";
import {DigitText} from "@cthit/react-digit-components";
import {GithubLoginButton, LoginButtonIcon, LoginButtonsContainer, LoginCard, LoginErrorText} from "./Login.styles";
import {PROVIDER_GITHUB} from "./providers";
import {getAuth} from "../../api/get.Auth.api";
import GitHubIcon from '@material-ui/icons/GitHub';

const Login = () => {
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
import styled from "styled-components"

export const LoginCard = styled.div`
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),
              0px 1px 1px 0px rgba(0,0,0,0.14),
              0px 1px 3px 0px rgba(0,0,0,0.12);
    padding: 20px;
    border-radius: 5px;
`;

export const LoginButtonsContainer = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const LoginButton = styled.button`
    width: 250px;
    padding: 10px;
    outline: none;
    border: none;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

export const LoginButtonIcon = styled.div`
  padding-left: 10px;
  padding-right: 10px;  
`

export const LoginErrorText = styled.p`
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 18px;
    color: red;
`

export const GithubLoginButton = styled(LoginButton)`
    background-color: #24292e;
    color: white;
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 14px;
    
    &:hover{
      background-color: #404040;
    }
    
    &:active{
      background-color: black;
    }
`;
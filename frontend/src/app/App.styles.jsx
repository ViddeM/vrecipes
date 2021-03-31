import styled from "styled-components";
import {AppBar, IconButton} from "@material-ui/core";
import {ReactComponent as VRecipesLogo} from "../resources/images/group_1_transparent.svg"
import {NavLink} from "react-router-dom";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const StyledAppBar = styled(AppBar)`
  height: 56px;
  margin-bottom: 24px;
`

export const AppContainer = styled.div`
  max-height: 100%;
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;

export const LogoTitleContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled(VRecipesLogo)`
  height: 100%;
  width: auto;
`

export const LogoButton = styled(IconButton)`
  height: 100%;
  
  &.MuiIconButton-sizeSmall .MuiIconButton-label {
    height: 100%;
  }
`;

export const EscapeHatch = styled(NavLink)`
  height: calc(100% - 10px);
  margin-right: 10px;
     border-radius: 100%;
  
  &:active {
     background-color: rgba(0,0,0,0.2);
  }
`

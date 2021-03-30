import styled from "styled-components";
import {AppBar} from "@material-ui/core";

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

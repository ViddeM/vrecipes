import styled from "styled-components"
import Card from "@material-ui/core/Card";
import {VTextField} from "../../common/elements/textfield/VTextField";
import Button from "@material-ui/core/Button";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
`;

export const BodyContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
`;

export const SearchAddContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  width: 50%;
  min-width: 280px;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: baseline;
  }
`;

export const SearchTextField = styled(VTextField)`
  flex: 1;
  width: 100%;
`

export const CreateRecipeButton = styled(Button)`
  height: 50px;
  margin: 10px !important;
`

export const StyledCard = styled(Card)`
  background-color: #388e3c !important;
  padding: 10px;
  margin-bottom: 40px
`

export const AddIconButtonContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 4;
`

export const ModeSelectContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`

export const ModeSelectButtonGroup = styled.div`
  width: 500px;
  max-width: 100%;
  display: flex;
  flex-direction: row;
`;

export const ButtonGroupDivider = styled.div`
  width: 1px;
  height: 100%;
  background-color: black;
`

export const BaseModeButton = styled(Button)`
  flex: 1;
  border-radius: 0 !important;
`

export const ModeLeftButton = styled(BaseModeButton)`
  @media (min-width: 500px) {
    border-radius: 20px 0 0 20px !important;
  }
`

export const ModeRightButton = styled(BaseModeButton)`
  @media (min-width: 500px) {
    border-radius: 0 20px 20px 0 !important;
  }
`

export const ModeButton = styled(BaseModeButton)`
`
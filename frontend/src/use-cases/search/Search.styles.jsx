import styled from "styled-components"
import Card from "@material-ui/core/Card";
import {Typography} from "@material-ui/core";
import {VTextField} from "../../common/elements/textfield/VTextField";
import Button from "@material-ui/core/Button";

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    flex: 1;
`;

export const BodyContainer = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: row;
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
    width: 50%;
    min-width: 300px;
    margin-bottom: 20px;
    
    @media (min-width: 1024px) {
      flex-direction: row;
      align-items: baseline;
    }
`;

export const SearchTextField = styled(VTextField)`
  flex: 1;
  width: 100%;
`

export const WelcomeText = styled(Typography)`
  color: white;
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

export const OutlinedText = styled(Typography)`
  -webkit-text-fill-color: yellow;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: black;
    font-weight: bold;
`;

export const AddIconButtonContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 4;
`
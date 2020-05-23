import styled from "styled-components"
import {DigitDesign} from "@cthit/react-digit-components";

export const RecipeListCardCard = styled(DigitDesign.Card)`
    background-color: #4caf50;
    max-width: 400px;
    padding: 10px;
    color: white;
`;

export const ButtonContainer = styled.div`
    margin: 20px
`

export const ImageBorder = styled.div`
    padding: 1px;
    border-radius: 40px;
    background-color: #606060;
`;

export const ImageContainer = styled.div`
    border-radius: 40px;
    width: 300px;
    height: 300px;  
    background-color: white;
    background-size: cover;
    
    -webkit-box-shadow: inset 4px 4px 54px 0px rgba(0,0,0,0.68);
    -moz-box-shadow: inset 4px 4px 54px 0px rgba(0,0,0,0.68);
    box-shadow: inset 4px 4px 54px 0px rgba(0,0,0,0.68);
`;

export const Center = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const SmallVSpace = styled.div`
    height: 5px;
`;

export const RecipeListCardFooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
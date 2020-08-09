import styled from "styled-components"
import {DigitDesign} from "@cthit/react-digit-components";

export const RecipeListCardContainer = styled.div`
    max-width: 320px;
    margin: 20px;
`;

export const ButtonCard = styled.button`
    border: none;
    background-color: inherit;
    padding: 0;
    color: white;
`;

export const ImageBorder = styled.div`
    padding: 1px;
    border-radius: 40px;
    max-width: 300px;
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

export const RecipeListCardFooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const SmallVSpace = styled.div`
    height: 5px;
`;

export const RecipeListCardCard = styled(DigitDesign.Card)`
    background-color: #4caf50;
    max-width: 400px;
    padding: 10px;
    color: white;
    display: inline-block;
    vertical-align: middle;
    
           
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);        
    box-shadow: 0 6px 6px -6px rgba(0, 0, 0, 0.5);

    position: relative;
    overflow: hidden;
    background: #208020;
    -webkit-transition-property: color;
    transition-property: color;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;

    &:before {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #60B060;
        border-radius: 100%;
        -webkit-transform: scale(0);
        transform: scale(0);
        -webkit-transition-property: transform;
        transition-property: transform;
        -webkit-transform-duration: 0.3s;
        transition-duration: 0.3s;
        -webkit-transition-timing-function: ease-out;
        transition-timing-function: ease-out;
    }
    
    &:hover {
        box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
        -webkit-transform: scale(1.03);
        transform: scale(1.03);
    }
    
    &:focus,
    &:active {
        &:before {
                -webkit-transform: scale(2);
                transform: scale(2);
        }
    }
`;
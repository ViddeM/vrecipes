import styled from "styled-components"
import {DigitDesign} from "@cthit/react-digit-components";

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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

export const SearchBox = styled.div`
     
`;

export const StyledDigitCard = styled(DigitDesign.Card)`
    background-color: green;
    padding: 10px;
    margin-bottom: 40px
`
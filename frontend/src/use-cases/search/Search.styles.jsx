import styled from "styled-components"
import {DigitDesign} from "@cthit/react-digit-components";

export const SearchContainer = styled.div`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const VSpace = styled.div`
    min-height: 50px;
`;

export const SmallVSpace = styled.div`
    min-height: 20px;
`;

export const SearchBox = styled.div`
     
`;

export const StyledDigitCard = styled(DigitDesign.Card)`
    background-color: green;
    padding: 10px
`
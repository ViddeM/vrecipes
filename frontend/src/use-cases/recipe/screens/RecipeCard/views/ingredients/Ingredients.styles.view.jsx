import styled from "styled-components"
import {StyledText} from "../../../../../../common/styles/Common.styles";

export const IngredientsContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    
    @media (min-width: 1024px) {
      margin-left: 20px;
      margin-right: 20px;
    }
`;

export const IngredientsTable = styled.table`
  width: 100%;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px;
  border-spacing: 0;
`


export const IngredientRowElement = styled.td`
  border-top: 1px solid gray;
  padding: 5px;
`

export const IngredientNameContainer = styled(IngredientRowElement)`
  width: 70%;
`

export const IngredientText = styled(StyledText)`
    margin: 0px;
`;
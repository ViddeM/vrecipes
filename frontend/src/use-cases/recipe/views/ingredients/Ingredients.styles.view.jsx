import styled from "styled-components"
import {StyledText} from "../../../../common/styles/Common.styles";

export const IngredientsContainer = styled.div`
    flex: 1;
`;

// export const IngredientsCard = styled(DigitDesign.Card)`
//     padding: 10px;
// `;

export const IngredientsCard = styled.div`
    padding: 10px; 
`;

export const IngredientContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%
`;

export const IngredientText = styled(StyledText)`
    width: 80%
`;
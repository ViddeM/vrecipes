import styled from "styled-components";

export const RecipeStepsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    
    @media (min-width: 1024px) {
        margin-right: 20px;
        margin-left: 20px;
    }
`;

export const StepContainer = styled.div`
`;

export const StepRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
`;


export const RecipeStepTable = styled.table`

`
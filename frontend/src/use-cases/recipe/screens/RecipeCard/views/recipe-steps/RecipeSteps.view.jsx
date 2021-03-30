import React from "react"
import {RecipeStepsContainer, StepContainer, StepRow} from "./RecipeSteps.styles.view";
import {FullHLine, LongStyledText, StyledText} from "../../../../../../common/styles/Common.styles";
import {FullWidth} from "../../RecipeCard.styles.screen";

const RecipeSteps = props => (
    <RecipeStepsContainer>
        <StyledText variant="h6">
            Gör såhär
        </StyledText>
        <FullHLine/>
        <FullWidth>
            {
                props.steps.map((step, index) => (
                    <StepContainer key={index}>
                        {index > 0 &&
                        <FullHLine/>
                        }
                        <StepRow>
                            <StyledText>
                                {step.number + 1 + "."}
                            </StyledText>
                            <LongStyledText>
                                {step.description}
                            </LongStyledText>
                        </StepRow>
                    </StepContainer>
                ))
            }
            <FullHLine/>
        </FullWidth>
    </RecipeStepsContainer>
);

export default RecipeSteps;
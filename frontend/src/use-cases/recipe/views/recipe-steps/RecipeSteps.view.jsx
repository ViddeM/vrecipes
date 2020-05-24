import React from "react"
import {RecipeStepsContainer, StepContainer, StepRow} from "./RecipeSteps.styles.view";
import {FullHLine, HLine, StyledText, TitleText} from "../../../../common/styles/Common.styles";
import {DescriptionBox} from "../../Recipe.styles";

const RecipeSteps = props => (
    <RecipeStepsContainer>
        <TitleText text="Gör såhär" />
        <HLine />
        <DescriptionBox>
            {
                props.steps.map((step, index) => (
                    <StepContainer>
                        {index > 0 &&
                        <FullHLine />
                        }
                        <StepRow>
                            <StyledText text={step.number + "."} />
                            <StyledText text={step.description} />
                        </StepRow>
                    </StepContainer>
                ))
            }
        </DescriptionBox>
    </RecipeStepsContainer>
);

export default RecipeSteps;
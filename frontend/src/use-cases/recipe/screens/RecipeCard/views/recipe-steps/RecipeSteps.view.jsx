import React from "react"
import {RecipeStepsContainer, StepContainer, StepRow} from "./RecipeSteps.styles.view";
import {FullHLine, HLine, StyledText, TitleText} from "../../../../../../common/styles/Common.styles";
import {DescriptionBox} from "../../RecipeCard.styles.screen";

const RecipeSteps = props => (
    <RecipeStepsContainer>
        <TitleText text="Gör såhär"/>
        <HLine/>
        <DescriptionBox>
            {
                props.steps.map((step, index) => (
                    <StepContainer key={index}>
                        {index > 0 &&
                        <FullHLine/>
                        }
                        <StepRow>
                            <StyledText text={step.number + 1 + "."}/>
                            <StyledText text={step.description}/>
                        </StepRow>
                    </StepContainer>
                ))
            }
        </DescriptionBox>
    </RecipeStepsContainer>
);

export default RecipeSteps;
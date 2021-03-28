import React from "react"
import {RecipeStepsContainer, StepContainer, StepRow} from "./RecipeSteps.styles.view";
import {FullHLine, LongStyledText, StyledText, SubtitleText} from "../../../../../../common/styles/Common.styles";
import {FullWidth} from "../../RecipeCard.styles.screen";

const RecipeSteps = props => (
    <RecipeStepsContainer>
        <SubtitleText text="Gör såhär"/>
        <FullHLine/>
        <FullWidth>
            {
                props.steps.map((step, index) => (
                    <StepContainer key={index}>
                        {index > 0 &&
                        <FullHLine/>
                        }
                        <StepRow>
                            <StyledText text={step.number + 1 + "."}/>
                            <LongStyledText text={step.description}/>
                        </StepRow>
                    </StepContainer>
                ))
            }
            <FullHLine/>
        </FullWidth>
    </RecipeStepsContainer>
);

export default RecipeSteps;
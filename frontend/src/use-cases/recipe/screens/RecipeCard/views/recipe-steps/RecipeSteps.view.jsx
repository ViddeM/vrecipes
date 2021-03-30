import React from "react"
import {RecipeStepsContainer, StepContainer, StepRow} from "./RecipeSteps.styles.view";
import {FullHLine, LongStyledText, StyledText, SubtitleText} from "../../../../../../common/styles/Common.styles";
import {FullWidth} from "../../RecipeCard.styles.screen";

const RecipeSteps = props => (
    <RecipeStepsContainer>
        <SubtitleText variant>
            Gör såhär
        </SubtitleText>
        <FullHLine/>
        <FullWidth>
            {
                props.steps.map((step, index) => (
                    <StepContainer key={index}>
                        <div style={{height: "20px"}}/>
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
        </FullWidth>
    </RecipeStepsContainer>
);

export default RecipeSteps;
import React from "react"
import {
    Column,
    DescriptionBox,
    FullWidth,
    RecipeCardContainer,
    RecipeIngredientStepImagesContainer,
    Rows,
    StyledTimeIcon,
    TimeContainer,
    TopRow
} from "./RecipeCard.styles.screen";
import {useHistory} from "react-router";
import {DigitIconButton} from "@cthit/react-digit-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {Center, HLine, HSpace, StyledText, SubtitleText, TitleText} from "../../../../common/styles/Common.styles";
import Ingredients from "./views/ingredients";
import RecipeSteps from "./views/recipe-steps/RecipeSteps.container.view";
import Images from "./views/images/Images.container.view";
import RecipeFooter from "./views/recipe-footer/RecipeFooter.container.view";

const RecipeCard = props => {

    let history = useHistory();

    return (
        <RecipeCardContainer>
            <Rows>
                <TopRow>
                    <DigitIconButton icon={ArrowBackIcon} onClick={() => history.goBack()}/>
                </TopRow>
                <Center>
                    <TitleText text={props.recipe.name}/>
                </Center>
                <HLine/>
                <Center>
                    <StyledText text={"Upplagd av " + props.recipe.author.name}/>
                </Center>
                {(props.recipe.estimatedTime >= 0 || props.recipe.ovenTemperature >= 0) &&
                <>
                    <HLine/>
                    <TimeContainer>
                        {props.recipe.ovenTemperature >= 0 &&
                        <StyledText text={"ugn " + props.recipe.ovenTemperature + "°"}/>
                        }
                        {props.recipe.ovenTemperature >= 0 && props.recipe.estimatedTime >= 0 &&
                        <HSpace/>
                        }
                        {props.recipe.estimatedTime >= 0 &&
                        <TimeContainer>
                            <StyledText text={props.recipe.estimatedTime}/>
                            <StyledTimeIcon/>
                        </TimeContainer>
                        }
                    </TimeContainer>
                </>
                }
                {props.recipe.description &&
                <>
                    <HLine/>
                    <div style={{height: "40px"}}/>
                    <Center>
                        <SubtitleText text="Beskrivning"/>
                    </Center>
                    <HLine/>
                    <Center>
                        <DescriptionBox>
                            <StyledText text={props.recipe.description}/>
                        </DescriptionBox>
                    </Center>
                    <HLine/>
                </>
                }

                <RecipeIngredientStepImagesContainer>
                    {(props.recipe.ingredients.length > 0 || props.recipe.steps.length > 0) && (
                        <Column>
                            {props.recipe.ingredients.length > 0 && (
                                <>
                                    <FullWidth>
                                        <Column>
                                            <Center>
                                                <Ingredients/>
                                            </Center>
                                        </Column>
                                    </FullWidth>
                                </>
                            )}
                            {props.recipe.steps.length > 0 && (
                                <FullWidth>
                                    <Column>
                                        <Center>
                                            <RecipeSteps steps={props.recipe.steps}/>
                                        </Center>
                                    </Column>
                                </FullWidth>
                            )}
                        </Column>
                    )}
                    <Column>
                        <Images fullWidth/>
                    </Column>
                </RecipeIngredientStepImagesContainer>
                <RecipeFooter/>
            </Rows>
        </RecipeCardContainer>
    );
}

export default RecipeCard;
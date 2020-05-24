import React from "react"
import {
    CenteredColumn,
    Column,
    Columns,
    DescriptionBox,
    RecipeCard,
    RecipeContainer,
    Rows,
    StyledTimeIcon,
    TimeContainer,
    VLineContainer
} from "./Recipe.styles";
import {
    Center,
    HLine,
    HSpace,
    SmallVSpace,
    StyledText,
    TitleText,
    VLine,
    VSpace
} from "../../common/styles/Common.styles";
import Images from "./views/images";
import Ingredients from "./views/ingredients";
import RecipeFooter from "./views/recipe-footer/RecipeFooter.container.view";
import RecipeSteps from "./views/recipe-steps";

const Recipe = props => (
    <RecipeContainer>
        <RecipeCard>
            <Rows>
                <Columns>
                    <Column>
                        <VSpace />
                        <Center>
                            <TitleText text={props.recipe.name} />
                        </Center>
                        {(props.recipe.estimatedTime || props.recipe.ovenTemperature) &&
                        <CenteredColumn>
                            <HLine />
                            <TimeContainer>
                                {props.recipe.ovenTemperature &&
                                <StyledText text={"ugn " + props.recipe.ovenTemperature + " grader"} />
                                }
                                {props.recipe.ovenTemperature && props.recipe.estimatedTime &&
                                <HSpace />
                                }
                                {props.recipe.estimatedTime &&
                                <TimeContainer>
                                    <StyledText text={props.recipe.estimatedTime} />
                                    <StyledTimeIcon />
                                </TimeContainer>
                                }
                            </TimeContainer>
                            <HLine />
                        </CenteredColumn>
                        }
                        {props.recipe.description &&
                        <Center>
                            <DescriptionBox>
                                <StyledText text={props.recipe.description} />
                            </DescriptionBox>
                        </Center>
                        }
                    </Column>
                    <Column>
                        <Images />
                    </Column>
                </Columns>
                <SmallVSpace />
                <Columns>
                    {props.recipe.steps.length > 0 && (
                        <Column>
                            <RecipeSteps steps={props.recipe.steps} />
                        </Column>
                    )}
                    {props.recipe.ingredients.length > 0 && props.recipe.steps.length > 0 && (
                        <VLineContainer>
                            <VLine className="VLINE" />
                        </VLineContainer>
                    )}
                    {props.recipe.ingredients.length > 0 && (
                        <Column>
                            <Center>
                                <Ingredients />
                            </Center>
                        </Column>
                    )}
                </Columns>
                <RecipeFooter />
            </Rows>
        </RecipeCard>
    </RecipeContainer>
);

export default Recipe;
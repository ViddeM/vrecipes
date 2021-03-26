import React from "react"
import {
    CenteredColumn,
    Column,
    Columns,
    DescriptionBox,
    FullWidth,
    RecipeCardContainer,
    Rows,
    StyledTimeIcon,
    TimeContainer,
    TopRow,
    VLineContainer
} from "./RecipeCard.styles.screen";
import {
    Center,
    HLine,
    HSpace,
    SmallVSpace,
    StyledText,
    TitleText,
    VLine,
    VSpace
} from "../../../../common/styles/Common.styles";
import Images from "./views/images";
import Ingredients from "./views/ingredients";
import RecipeFooter from "./views/recipe-footer/RecipeFooter.container.view";
import RecipeSteps from "./views/recipe-steps";
import {DigitButton} from "@cthit/react-digit-components";

const RecipeCard = props => (
    <RecipeCardContainer>
        <Rows>
            <TopRow>
                <DigitButton text={"Tillbaka"} raised secondary
                             onClick={props.backToSearch}/>
            </TopRow>
            <Columns>
                <Column>
                    <VSpace/>
                    <Center>
                        <TitleText text={props.recipe.name}/>
                    </Center>
                    <CenteredColumn>
                        <HLine/>
                    </CenteredColumn>
                    <CenteredColumn>
                        <StyledText text={"Upplagd av " + props.recipe.author.name}/>
                    </CenteredColumn>
                    <CenteredColumn>
                        <HLine/>
                    </CenteredColumn>
                    {(props.recipe.estimatedTime >= 0 || props.recipe.ovenTemperature >= 0) &&
                    <CenteredColumn>
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
                        <HLine/>
                    </CenteredColumn>
                    }
                    {props.recipe.description &&
                    <Center>
                        <DescriptionBox>
                            <StyledText text={props.recipe.description}/>
                        </DescriptionBox>
                    </Center>
                    }
                </Column>
                <Column>
                    <Images/>
                </Column>
            </Columns>
            <SmallVSpace/>
            <FullWidth>
                <Columns>
                    {props.recipe.ingredients.length > 0 && (
                        <Column>
                            <Center>
                                <Ingredients/>
                            </Center>
                        </Column>
                    )}
                    {props.recipe.ingredients.length > 0 && props.recipe.steps.length > 0 && (
                        <VLineContainer>
                            <VLine className="VLINE"/>
                        </VLineContainer>
                    )}
                    {props.recipe.steps.length > 0 && (
                        <Column>
                            <RecipeSteps steps={props.recipe.steps}/>
                        </Column>
                    )}
                </Columns>
            </FullWidth>
            <RecipeFooter/>
        </Rows>
    </RecipeCardContainer>
);

export default RecipeCard;
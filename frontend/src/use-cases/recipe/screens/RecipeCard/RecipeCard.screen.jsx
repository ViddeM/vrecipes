import React from "react"
import {
    Column,
    DescriptionBox,
    FullWidth,
    RecipeCardContainer,
    RecipeIngredientStepImagesContainer,
    Rows,
    StyledTimeIcon,
    TagContainer,
    TimeContainer,
    TopRow
} from "./RecipeCard.styles.screen";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import {
    Center,
    HLine,
    HSpace,
    StyledText
} from "../../../../common/styles/Common.styles";
import {Typography} from "@material-ui/core";
import Images from "./views/images/Images.container.view";
import RecipeSteps from "./views/recipe-steps/RecipeSteps.container.view";
import Ingredients from "./views/ingredients/Ingredients.container.view";
import RecipeFooter from "./views/recipe-footer/RecipeFooter.container.view";
import {useHistory} from "react-router";
import {Tag} from "../../../../common/elements/Tag/Tag";

const RecipeCard = props => {

    let history = useHistory();

    return (
    <RecipeCardContainer>
        <Rows>
            <TopRow>
                <IconButton onClick={() => history.goBack()}>
                    <ArrowBackIcon/>
                </IconButton>
            </TopRow>
            <Center>
                <Typography variant="h4">
                    {props.recipe.name}
                </Typography>
            </Center>
            <HLine/>
            <Center>
                <StyledText variant="subtitle1">
                    {"Upplagd av " + props.recipe.author.name}
                </StyledText>
            </Center>

            {props.recipe.tags.length > 0 && (
            <>
                <HLine/>
                <TagContainer>
                    {props.recipe.tags.map(tag => (
                    <Tag key={tag.id} text={tag.name} color={tag.color}
                         url={"https://google.com"}/>

                    ))}
                </TagContainer>
            </>

            )}

            {(props.recipe.estimatedTime >= 0 || props.recipe.ovenTemperature >= 0) &&
            <>
                <HLine/>
                <TimeContainer>
                    {props.recipe.ovenTemperature >= 0 &&
                    <StyledText variant="subtitle1">
                        {"ugn " + props.recipe.ovenTemperature + "°"}
                    </StyledText>
                    }
                    {props.recipe.ovenTemperature >= 0 && props.recipe.estimatedTime >= 0 &&
                    <HSpace/>
                    }
                    {props.recipe.estimatedTime >= 0 &&
                    <TimeContainer>
                        <StyledText variant="subtitle1">
                            {props.recipe.estimatedTime}
                        </StyledText>
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
                    <StyledText variant="h6">
                        Beskrivning
                    </StyledText>
                </Center>
                <HLine/>
                <Center>
                    <DescriptionBox>
                        <StyledText>
                            {props.recipe.description}
                        </StyledText>
                    </DescriptionBox>
                </Center>
                <HLine/>
            </>
            }

            <RecipeIngredientStepImagesContainer>
                {(props.recipe.ingredients.length > 0) && (
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
                </Column>
                )}
                <Column>
                    <Images fullWidth/>
                </Column>
            </RecipeIngredientStepImagesContainer>

            {props.recipe.steps.length > 0 && (
            <FullWidth>
                <Column>
                    <Center>
                        <RecipeSteps steps={props.recipe.steps}/>
                    </Center>
                </Column>
            </FullWidth>
            )}
            <RecipeFooter/>
        </Rows>
    </RecipeCardContainer>
    );
}

export default RecipeCard;
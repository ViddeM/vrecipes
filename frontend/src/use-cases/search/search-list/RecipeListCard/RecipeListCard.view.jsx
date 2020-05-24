import React from "react"
import {
    ButtonContainer,
    ImageBorder,
    ImageContainer,
    RecipeListCardCard,
    RecipeListCardFooterContainer,
    SmallVSpace
} from "./RecipeListCard.styles.view";
import ButtonBase from "@material-ui/core/ButtonBase";
import {DigitDesign, DigitText} from "@cthit/react-digit-components";
import {Center} from "../../../../common/styles/Common.styles";


const RecipeListCard = props => {
    const recipe = props.recipe;
    let imageUrl = recipe.image;
    if (imageUrl === undefined) {
        imageUrl = "/static/images/temp_image.jpg"
    }

    return (
        <ButtonContainer>
            <DigitDesign.Link to={"/recipes/" + recipe.id}>
                <ButtonBase focusRipple onClick={() => props.onRecipeCardClicked(recipe.id)}>
                    <RecipeListCardCard>
                        <ImageBorder>
                            <ImageContainer style={{backgroundImage: `url(${imageUrl}`}} />
                        </ImageBorder>
                        <SmallVSpace />
                        <Center>
                            <DigitText.Title text={recipe.name} />
                        </Center>
                        <SmallVSpace />
                        <RecipeListCardFooterContainer>
                            <DigitText.Text text={"Upplagd av " + recipe.author} />
                        </RecipeListCardFooterContainer>
                    </RecipeListCardCard>
                </ButtonBase>
            </DigitDesign.Link>
        </ButtonContainer>
    )
        ;
}

export default RecipeListCard;
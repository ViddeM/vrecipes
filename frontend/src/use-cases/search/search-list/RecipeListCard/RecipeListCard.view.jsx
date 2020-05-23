import React from "react"
import {
    ButtonContainer,
    Center,
    ImageBorder,
    ImageContainer,
    RecipeListCardCard,
    RecipeListCardFooterContainer,
    SmallVSpace
} from "./RecipeListCard.styles.view";
import ButtonBase from "@material-ui/core/ButtonBase";
import {DigitText} from "@cthit/react-digit-components";


const RecipeListCard = props => {
    const recipe = props.recipe;
    let imageUrl = recipe.image;
    if (imageUrl === undefined) {
        imageUrl = "/static/images/temp_image.jpg"
    }

    return (
        <ButtonContainer>
            <ButtonBase focusRipple>
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
        </ButtonContainer>
    );
}

export default RecipeListCard;
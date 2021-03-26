import React from "react";
import {
    ButtonCard,
    ImageBorder,
    ImageContainer,
    RecipeListCardCard,
    RecipeListCardContainer,
    RecipeListCardFooterContainer,
    SmallVSpace
} from "./RecipeListCard.styles.view";
import {DigitDesign, DigitText} from "@cthit/react-digit-components";
import {Center} from "../../../../common/styles/Common.styles";
import {getImageUrl} from "../../../../api/get.Image.api";

export const RecipeListCard = props => {
    const recipe = props.recipe;
    let imageUrl = recipe.image_link;
    if (imageUrl === undefined || imageUrl === "") {
        imageUrl = "static/images/temp_image.jpg"
    } else {
        imageUrl = getImageUrl(imageUrl)
    }


    return (
        <RecipeListCardContainer>
            <DigitDesign.Link to={"/recipes/" + recipe.unique_name}>
                <ButtonCard onClick={() => props.onRecipeCardClicked(recipe.id)}>
                    <RecipeListCardCard>
                        <ImageBorder>
                            <ImageContainer style={{backgroundImage: `url(${imageUrl}`}}/>
                        </ImageBorder>
                        <SmallVSpace/>
                        <Center>
                            <DigitText.Title text={recipe.name}/>
                        </Center>
                        <SmallVSpace/>
                        <RecipeListCardFooterContainer>
                            <DigitText.Text text={"Upplagd av " + recipe.author.name}/>
                        </RecipeListCardFooterContainer>
                    </RecipeListCardCard>
                </ButtonCard>
            </DigitDesign.Link>
        </RecipeListCardContainer>
    );
}

export default RecipeListCard;
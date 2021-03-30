import React from "react";
import {
    ImageBorder,
    ImageContainer,
    RecipeListCardCard,
    RecipeListCardContainer,
    RecipeListCardFooterContainer,
    SmallVSpace
} from "./RecipeListCard.styles.view";
import {getImageUrl} from "../../../../api/get.Image.api";
import {NavLink} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {Center} from "../../../../common/styles/Common.styles";

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
            <NavLink to={"/recipes/" + recipe.unique_name}>
                <RecipeListCardCard>
                    <ImageBorder>
                        <ImageContainer style={{backgroundImage: `url(${imageUrl}`}}/>
                    </ImageBorder>
                    <SmallVSpace/>
                    <SmallVSpace/>
                    <Center>
                        <Typography variant="h6">
                            {recipe.name}
                        </Typography>
                    </Center>
                    <RecipeListCardFooterContainer>
                        <Typography>
                            {"Upplagd av " + recipe.author.name}
                        </Typography>
                    </RecipeListCardFooterContainer>
                </RecipeListCardCard>
            </NavLink>
        </RecipeListCardContainer>
    );
}

export default RecipeListCard;
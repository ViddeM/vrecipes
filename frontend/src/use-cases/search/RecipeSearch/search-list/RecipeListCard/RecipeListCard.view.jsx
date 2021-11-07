import React, {useState} from "react";
import {
    ImageBorder,
    ImageContainer,
    RecipeListCardCard,
    RecipeListCardContainer,
    RecipeListCardFooterContainer,
    SmallVSpace,
    TagGrid
} from "./RecipeListCard.styles.view";
import {getImageUrl} from "../../../../../api/get.Image.api";
import {NavLink} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {Center} from "../../../../../common/styles/Common.styles";
import {Tag} from "../../../../../common/elements/tag/Tag";

export const RecipeListCard = props => {
    const recipe = props.recipe;
    let imageUrl = recipe.image_link;
    if (imageUrl === undefined || imageUrl === "") {
        imageUrl = "static/images/default_recipe.png"
    } else {
        imageUrl = getImageUrl(imageUrl)
    }
    const [errored, setErrored] = useState(false);
    if (errored) {
        if (imageUrl.endsWith(".pdf")) {
            imageUrl = "static/images/pdf_not_supported.png"
        } else {
            imageUrl = "static/images/default_recipe.png"
        }
    }

    return (
    <RecipeListCardContainer>
        <NavLink to={"/recipes/" + recipe.unique_name}>
            <RecipeListCardCard>
                <ImageBorder>
                    <ImageContainer src={imageUrl}
                                    alt="Kunde inte visa bild"
                                    onError={() => {
                                        if (!errored) {
                                            setErrored(true)
                                        }
                                    }}

                    />
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
                <TagGrid>
                    {
                        recipe.tags.map(tag => (
                        <Tag key={tag.id} color={tag.color} text={tag.name} noLink={true}/>
                        ))
                    }
                </TagGrid>
            </RecipeListCardCard>
        </NavLink>
    </RecipeListCardContainer>
    );
}

export default RecipeListCard;
import React from "react";
import {NavLink} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {Center} from "../../../../../common/styles/Common.styles";
import {
    ImageBorder, ImageContainer,
    RecipeListCardCard,
    RecipeListCardContainer, RecipeListCardFooterContainer, SmallVSpace
} from "../../../RecipeSearch/search-list/RecipeListCard/RecipeListCard.styles.view";

export const BookListCard = props => {
    const book = props.book;
    const imageUrl = "static/images/default_book_2.png"

    return (
    <RecipeListCardContainer>
        <NavLink to={"/books/" + book.unique_name}>
            <RecipeListCardCard>
                <ImageBorder>
                    <ImageContainer src={imageUrl}
                                    alt="Kunde inte visa bild"

                    />
                </ImageBorder>
                <SmallVSpace/>
                <Center>
                    <Typography variant="h6">
                        {book.name}
                    </Typography>
                </Center>
                <RecipeListCardFooterContainer>
                    <Typography>
                        {"Upplagd av " + book.uploaded_by.name}
                    </Typography>
                </RecipeListCardFooterContainer>
            </RecipeListCardCard>
        </NavLink>
    </RecipeListCardContainer>
    );
}

export default BookListCard;
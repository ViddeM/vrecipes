import React from "react";
import {NavLink} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {Center} from "../../../../../common/styles/Common.styles";
import {
    ImageBorder, ImageContainer,
    RecipeListCardCard,
    RecipeListCardContainer, RecipeListCardFooterContainer, SmallVSpace
} from "../../../RecipeSearch/search-list/RecipeListCard/RecipeListCard.styles.view";
import {getImageUrl} from "../../../../../api/get.Image.api";

export const BookListCard = props => {
    const book = props.book;
    let imageUrl = "static/images/default_book_2.png"
    if (book.imageLink) {
       imageUrl = getImageUrl(book.imageLink)
    }

    return (
    <RecipeListCardContainer>
        <NavLink to={"/books/" + book.uniqueName}>
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
                        {"Upplagd av " + book.uploadedBy.name}
                    </Typography>
                </RecipeListCardFooterContainer>
            </RecipeListCardCard>
        </NavLink>
    </RecipeListCardContainer>
    );
}

export default BookListCard;
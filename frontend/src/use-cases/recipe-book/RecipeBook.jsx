import React from "react"
import {RecipeBookContainer} from "./RecipeBook.styles";
import RecipeBookCard from "./RecipeBookCard/RecipeBookCard.container";

export const RecipeBook = props => {
    console.log("PROPS:", props)
    const {match: {params}} = props;

    return (
    <RecipeBookContainer>
        <RecipeBookCard />
    </RecipeBookContainer>
    )
}
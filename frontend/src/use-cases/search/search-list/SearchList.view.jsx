import React from "react"
import RecipeListCard from "./RecipeListCard/RecipeListCard.container.view";
import {ListContainer} from "./SearchList.styles.view";

const SearchListView = props => (
    <ListContainer>
        {props.recipes.map(recipe => (
            <RecipeListCard recipe={recipe} key={recipe.id} />
        ))}
    </ListContainer>
);

export default SearchListView;
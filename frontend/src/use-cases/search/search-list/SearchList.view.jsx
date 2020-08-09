import React from "react"
import {ListContainer} from "./SearchList.styles.view";
import RecipeListCard from "./RecipeListCard/RecipeListCard.container.view";

const SearchListView = props => (
    <ListContainer>
        {props.recipes.map(recipe => (
            <div>
                <RecipeListCard recipe={recipe} key={recipe.id}/>
            </div>
        ))}
    </ListContainer>
);

export default SearchListView;
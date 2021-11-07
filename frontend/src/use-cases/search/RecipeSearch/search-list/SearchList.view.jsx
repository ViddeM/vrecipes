import React from "react"
import {ListContainer} from "./SearchList.styles.view";
import RecipeListCard from "./RecipeListCard/RecipeListCard.container.view";
import Typography from "@material-ui/core/Typography";

const SearchListView = props => {
    return (
        <ListContainer>
            {
                props.recipes.length > 0 ?
                    props.recipes.map(recipe => (
                        <RecipeListCard recipe={recipe} key={recipe.id}/>
                    )) : (
                        <Typography>
                            Inga recept, lägg till några!
                        </Typography>
                    )
            }
        </ListContainer>
    );
}

export default SearchListView;
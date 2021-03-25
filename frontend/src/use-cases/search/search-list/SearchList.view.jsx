import React from "react"
import {ListContainer} from "./SearchList.styles.view";
import RecipeListCard from "./RecipeListCard/RecipeListCard.container.view";
import {DigitText} from "@cthit/react-digit-components";

const SearchListView = props => (
    <ListContainer>
        {
            props.recipes.length > 0 ?
                props.recipes.map(recipe => (
                    <div>
                        <RecipeListCard recipe={recipe} key={recipe.id}/>
                    </div>
                )) : (
                    <DigitText.Text text="Inga recept, lägg till några!"/>
                )
        }
    </ListContainer>
);

export default SearchListView;
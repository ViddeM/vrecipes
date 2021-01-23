import {ON_SEARCH_FIELD_CHANGED} from "./Search.actions";
import {ON_RECIPE_CARD_CLICKED} from "./search-list/RecipeListCard/RecipeListCard.actions.view";
import {GET_RECIPES_FAILED} from "../../app/App.actions";

const initialState = {
    searchText: "",
    selectedRecipe: null,
    error: null
}

export function search(state = initialState, action) {
    switch (action.type) {
        case ON_SEARCH_FIELD_CHANGED:
            return Object.assign({}, state, {
                searchText: action.payload.newValue
            })
        case ON_RECIPE_CARD_CLICKED:
            return Object.assign({}, state, {
                selectedRecipe: action.payload.recipe
            })
        case GET_RECIPES_FAILED:
            return Object.assign({}, state, {
                error: action.payload.message
            });
        default:
            return state;
    }
}

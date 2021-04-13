import {ON_RECIPE_BOOK_SEARCH_FIELD_CHANGED} from "./RecipeBookSearch.actions";

const initialState = {
    searchText: ""
}

export function bookSearch(state = initialState, action) {
    switch (action.type) {
        case ON_RECIPE_BOOK_SEARCH_FIELD_CHANGED:
            return Object.assign({}, state, {
                searchText: action.payload.newValue
            })
        default:
            return state;
    }
}

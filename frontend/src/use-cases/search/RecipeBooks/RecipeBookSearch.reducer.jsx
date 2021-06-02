import {
    GET_RECIPE_BOOKS_FAILED,
    ON_RECIPE_BOOK_SEARCH_FIELD_CHANGED
} from "./RecipeBookSearch.actions";

const initialState = {
    searchText: "",
    error: null
}

export function bookSearch(state = initialState, action) {
    switch (action.type) {
        case ON_RECIPE_BOOK_SEARCH_FIELD_CHANGED:
            return Object.assign({}, state, {
                searchText: action.payload.newValue
            })
        case GET_RECIPE_BOOKS_FAILED:
            return Object.assign({}, state, {
                error: action.payload.message
            })
        default:
            return state;
    }
}

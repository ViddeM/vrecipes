import {ON_RECIPE_BOOK_SEARCH_FIELD_CHANGED} from "./RecipeBookSearch.actions";

export function onBookSearchChanged(newValue) {
    return {
        type: ON_RECIPE_BOOK_SEARCH_FIELD_CHANGED,
        payload: {
            newValue: newValue
        },
        error: false
    }
}
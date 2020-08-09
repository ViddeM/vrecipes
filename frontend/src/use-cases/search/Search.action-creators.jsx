import {CREATE_RECIPE, ON_SEARCH_FIELD_CHANGED} from "./Search.actions";

export function onSearchChanged(newValue) {
    return {
        type: ON_SEARCH_FIELD_CHANGED,
        payload: {
            newValue: newValue
        },
        error: false
    };
}

export function newRecipe() {
    return {
        type: CREATE_RECIPE,
        error: false
    }
}
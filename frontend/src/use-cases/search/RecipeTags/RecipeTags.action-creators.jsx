import {ON_RECIPE_TAGS_SEARCH_FIELD_CHANGE} from "./RecipeTags.actions";

export function recipeTagsSearchChanged(newText) {
    return {
        type: ON_RECIPE_TAGS_SEARCH_FIELD_CHANGE,
        payload: {
            newValue: newText
        },
        error: false
    }
}

export function saveNewRecipeTag(name, description, color) {
    
}
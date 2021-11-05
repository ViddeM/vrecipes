import {
    ON_RECIPE_TAGS_SEARCH_FIELD_CHANGE,
    ON_SET_CREATING_TAG
} from "./RecipeTags.actions";

export function recipeTagsSearchChanged(newText) {
    return {
        type: ON_RECIPE_TAGS_SEARCH_FIELD_CHANGE,
        payload: {
            newValue: newText
        },
        error: false
    }
}

export function setCreatingTag(creatingTag) {
    return {
        type: ON_SET_CREATING_TAG,
        payload: {
            creatingTag: creatingTag
        },
        error: false
    }
}
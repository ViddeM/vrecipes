import {
    GET_RECIPES_FAILED,
    ON_SEARCH_FIELD_CHANGED,
    SEARCH_SET_FILTER_TAGS
} from "./RecipeSearch.actions";

const initialState = {
    searchText: "",
    error: null,
    selectedTags: []
}

export function search(state = initialState, action) {
    switch (action.type) {
        case ON_SEARCH_FIELD_CHANGED:
            return Object.assign({}, state, {
                searchText: action.payload.newValue
            })
        case GET_RECIPES_FAILED:
            return Object.assign({}, state, {
                error: action.payload.message
            });
        case SEARCH_SET_FILTER_TAGS:
            return Object.assign({}, state, {
                selectedTags: action.payload.tags
            })
        default:
            return state;
    }
}

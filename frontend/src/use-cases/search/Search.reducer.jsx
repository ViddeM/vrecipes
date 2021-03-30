import {GET_RECIPES_FAILED, ON_SEARCH_FIELD_CHANGED} from "./Search.actions";

const initialState = {
    searchText: "",
    error: null
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
        default:
            return state;
    }
}

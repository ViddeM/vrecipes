import {ON_SEARCH_CHANGED} from "./Search.actions";

const initialState = {
    searchText: ""
}

export function search(state = initialState, action) {
    switch (action.type) {
        case ON_SEARCH_CHANGED:
            return Object.assign({}, state, {
                searchText: action.payload.newValue
            })
        default:
            return state;
    }
}

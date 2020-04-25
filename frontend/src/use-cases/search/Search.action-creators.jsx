import {ON_SEARCH_CHANGED} from "./Search.actions";

export function onSearchChanged(newValue) {
    return {
        type: ON_SEARCH_CHANGED,
        payload: {
            newValue: newValue
        },
        error: false
    };
}
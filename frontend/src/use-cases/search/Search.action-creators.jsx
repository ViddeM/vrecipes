import {ON_SEARCH_FIELD_CHANGED} from "./Search.actions";

export function onSearchChanged(newValue) {
    return {
        type: ON_SEARCH_FIELD_CHANGED,
        payload: {
            newValue: newValue
        },
        error: false
    };
}
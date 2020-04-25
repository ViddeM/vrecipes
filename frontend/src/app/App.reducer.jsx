import {combineReducers} from "redux";
import {search} from "../use-cases/search/Search.reducer";

export const rootReducer = combineReducers({
    init,
    search
});

export function init(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

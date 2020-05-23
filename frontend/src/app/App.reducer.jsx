import {combineReducers} from "redux";
import {search} from "../use-cases/search/Search.reducer";
import {INIT} from "./App.actions";
import {searchList} from "../use-cases/search/search-list/SearchList.reducer.view";

export const rootReducer = combineReducers({
    init,
    search,
    searchList
});

export function init(state = {
    debug: false
}, action) {
    switch (action.type) {
        case INIT:
            return Object.assign({}, state, {
                debug: action.payload.debug
            });
        default:
            return state;
    }
}

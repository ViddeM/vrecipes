import {combineReducers} from "redux";
import {search} from "../use-cases/search/Search.reducer";
import {INIT} from "./App.actions";
import {searchList} from "../use-cases/search/search-list/SearchList.reducer.view";
import {recipe} from "../use-cases/recipe/Recipe.reducer.screen";
import {create} from "../use-cases/create/Create.reducer"

export const rootReducer = combineReducers({
    init,
    search,
    searchList,
    recipe,
    create
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
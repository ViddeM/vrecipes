import { combineReducers } from "redux";
import { search } from "../use-cases/search/Search.reducer";
import { INIT } from "./App.actions";
import { searchList } from "../use-cases/search/search-list/SearchList.reducer.view";
import { recipe } from "../use-cases/recipe/Recipe.reducer.screen";
import { create } from "../use-cases/create/Create.reducer"
import { LIVE_MODE } from "../common/data/Mode";

export const rootReducer = combineReducers({
    init,
    search,
    searchList,
    recipe,
    create
});

export function init(state = {
    mode: LIVE_MODE
}, action) {
    switch (action.type) {
        case INIT:
            return Object.assign({}, state, {
                mode: action.payload.mode
            });
        default:
            return state;
    }
}
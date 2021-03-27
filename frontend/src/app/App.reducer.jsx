import {combineReducers} from "redux";
import {search} from "../use-cases/search/Search.reducer";
import {GET_ME_FAILED, GET_ME_SUCCESSFUL, INIT, ON_LOGOUT} from "./App.actions";
import {searchList} from "../use-cases/search/search-list/SearchList.reducer.view";
import {recipe} from "../use-cases/recipe/Recipe.reducer.screen";
import {create} from "../use-cases/create/Create.reducer"
import {LIVE_MODE} from "../common/data/Mode";

export const rootReducer = combineReducers({
    init,
    search,
    searchList,
    recipe,
    create
});


export function init(state = {
    mode: LIVE_MODE,
    redirectTo: "",
    user: null
}, action) {
    switch (action.type) {
        case INIT:
            return Object.assign({}, state, {
                mode: action.payload.mode,
                redirectTo: ""
            });
        case GET_ME_SUCCESSFUL:
            return Object.assign({}, state, {
                redirectTo: "",
                user: {
                    name: action.payload.name,
                    email: action.payload.email
                }
            })
        case GET_ME_FAILED:
            return Object.assign({}, state, {
                user: null
            })
        case ON_LOGOUT:
            return Object.assign({}, state, {
                user: null,
                redirectTo: "/login"
            })
        default:
            return state;
    }
}
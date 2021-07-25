import {combineReducers} from "redux";
import {search} from "../use-cases/search/RecipeSearch/RecipeSearch.reducer";
import {GET_ME_FAILED, GET_ME_SUCCESSFUL, INIT, ON_LOGOUT} from "./App.actions";
import {searchList} from "../use-cases/search/RecipeSearch/search-list/SearchList.reducer.view";
import {recipe} from "../use-cases/recipe/Recipe.reducer.screen";
import {create} from "../use-cases/create/Create.reducer"
import {LIVE_MODE} from "../common/data/Mode";
import {bookSearch} from "../use-cases/search/RecipeBooks/RecipeBookSearch.reducer";
import {bookList} from "../use-cases/search/RecipeBooks/book-list/BookList.reducer.view";
import {book} from "../use-cases/recipe-book/RecipeBook.reducer";
import {createBook} from "../use-cases/create-book/CreateBook.reducer";
import {recipeTags} from "../use-cases/search/RecipeTags/RecipeTags.reducer";

export const rootReducer = combineReducers(
{
    init,
    search,
    searchList,
    bookSearch,
    bookList,
    book,
    recipe,
    create,
    createBook,
    recipeTags
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
                    id: action.payload.id,
                    name: action.payload.name,
                    emails: action.payload.emails
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
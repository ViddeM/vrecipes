import {
    BACK_TO_BOOK_SEARCH,
    EDIT_RECIPE_BOOK,
    LOAD_RECIPE_BOOK_AWAIT_RESPONSE,
    LOAD_RECIPE_BOOK_FAILED,
    LOAD_RECIPE_BOOK_SUCCESSFUL,
    RESET_RECIPE_BOOK
} from "./RecipeBook.actions";
import {authorizedApiCall} from "../../common/functions/authorizedApiCall";
import {getRecipeBook} from "../../api/get.RecipeBook.api";
import {FAILED_TO_LOAD_RECIPE_BOOK,} from "../../common/translations/ResponseMessages";
import {handleError} from "../../common/functions/handleError";
import {loadRecipeBooks} from "../search/RecipeBooks/RecipeBookSearch.action-creators";

export function resetRecipeBook() {
    return {
        type: RESET_RECIPE_BOOK,
        payload: {},
        error: false,
    }
}

export function loadRecipeBook(bookId) {
    return dispatch => {
        dispatch({type: LOAD_RECIPE_BOOK_AWAIT_RESPONSE, error: false})
        authorizedApiCall(() => getRecipeBook(bookId))
        .then(response => {
            if (response.error) {
                return dispatch(onLoadRecipeBookFailed(response.errResponse))
            } else {
                return dispatch(onLoadRecipeBookSuccessful(response.response))
            }
        })
        .catch(error => {
            return dispatch(onLoadRecipeBookFailed(error))
        })
    }
}

function onLoadRecipeBookSuccessful(response) {
    return {
        type: LOAD_RECIPE_BOOK_SUCCESSFUL,
        payload: {
            response
        },
        error: false
    }
}

function onLoadRecipeBookFailed(error) {
    return handleError(error, LOAD_RECIPE_BOOK_FAILED, FAILED_TO_LOAD_RECIPE_BOOK)
}

export function backToBookSearch() {
    return dispatch => {
        dispatch(loadRecipeBooks())
        dispatch({
                     type: BACK_TO_BOOK_SEARCH,
                     error: false,
                 })
    }
}

export function editRecipeBook(book) {
    return {
        type: EDIT_RECIPE_BOOK,
        payload: {
            book: book,
        },
        error: false,
    }
}
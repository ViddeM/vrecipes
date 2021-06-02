import {
    GET_RECIPE_BOOKS_FAILED,
    GET_RECIPE_BOOKS_SUCCESSFUL,
    ON_RECIPE_BOOK_SEARCH_FIELD_CHANGED
} from "./RecipeBookSearch.actions";
import {authorizedApiCall} from "../../../common/functions/authorizedApiCall"
import {getRecipeBooks} from "../../../api/get.RecipeBooks.api";
import {
    GET_RECIPES_FAILED,
    GET_RECIPES_SUCCESSFUL
} from "../RecipeSearch/RecipeSearch.actions";
import {handleError} from "../../../common/functions/handleError";
import {
    FAILED_TO_LOAD_RECIPE_BOOKS,
    FAILED_TO_LOAD_RECIPES
} from "../../../common/translations/ResponseMessages";

export function onBookSearchChanged(newValue) {
    return {
        type: ON_RECIPE_BOOK_SEARCH_FIELD_CHANGED,
        payload: {
            newValue: newValue
        },
        error: false
    }
}

export function loadRecipeBooks() {
    return dispatch => {
        authorizedApiCall(getRecipeBooks)
        .then(response => {
            if (response.error) {
                return dispatch(onLoadRecipeBooksFailed(response.errResponse))
            } else {
                return dispatch(onLoadRecipeBooksSuccessful(response.response))
            }
        }).catch(error => {
            return dispatch(onLoadRecipeBooksFailed(error))
        })
    }
}

function onLoadRecipeBooksSuccessful(response) {
    return {
        type: GET_RECIPE_BOOKS_SUCCESSFUL,
        payload: {
            response
        },
        error: false
    }
}

function onLoadRecipeBooksFailed(error) {
    return handleError(error,
                       GET_RECIPE_BOOKS_FAILED,
                       FAILED_TO_LOAD_RECIPE_BOOKS);
}
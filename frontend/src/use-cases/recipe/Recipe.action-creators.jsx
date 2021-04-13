import {handleError} from "../../common/functions/handleError";
import {
    BACK_TO_SEARCH,
    LOAD_RECIPE_AWAIT_RESPONSE,
    LOAD_RECIPE_FAILED,
    LOAD_RECIPE_SUCCESSFUL,
    RESET_RECIPE
} from "./Recipe.actions";
import {getRecipe} from "../../api/get.Recipe.api";
import {FAILED_TO_LOAD_RECIPES} from "../../common/translations/ResponseMessages";
import {loadRecipes} from "../search/RecipeSearch/RecipeSearch.action-creators";
import {authorizedApiCall} from "../../common/functions/authorizedApiCall";


export function resetRecipe() {
    return {
        type: RESET_RECIPE,
        payload: {},
        error: false
    }
}

export function loadRecipe(recipeId) {
    return dispatch => {
        dispatch({type: LOAD_RECIPE_AWAIT_RESPONSE, error: false})
        authorizedApiCall(() => getRecipe(recipeId))
            .then(response => {
                if (response.error) {
                    return dispatch(onLoadRecipeFailed(response.errResponse))
                } else {
                    return dispatch(onLoadRecipeSuccessful(response.response))
                }
            })
            .catch(error => {
                return dispatch(onLoadRecipeFailed(error))
            })
    }
}

function onLoadRecipeSuccessful(response) {
    return {
        type: LOAD_RECIPE_SUCCESSFUL,
        payload: {
            response
        },
        error: false
    }
}

function onLoadRecipeFailed(error) {
    return handleError(error, LOAD_RECIPE_FAILED, FAILED_TO_LOAD_RECIPES);
}

export function backToSearch() {
    return dispatch => {
        dispatch(loadRecipes())
        dispatch({
            type: BACK_TO_SEARCH,
            error: false
        })
    }
}
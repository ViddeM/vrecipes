import {handleError} from "../../common/functions/handleError";
import {BACK_TO_SEARCH, LOAD_RECIPE_FAILED, LOAD_RECIPE_SUCCESSFUL, RESET_RECIPE} from "./Recipe.actions";
import {getRecipe} from "../../api/get.Recipe.api";
import {FAILED_TO_LOAD_RECIPES} from "../../common/translations/ResponseMessages";
import {loadRecipes} from "../../app/App.action-creators";


export function resetRecipe() {
    return {
        type: RESET_RECIPE,
        payload: {},
        error: false
    }
}

export function loadRecipe(recipeId) {

    return dispatch => {
        getRecipe(recipeId).then(response => {
            return dispatch(onLoadRecipeSuccessful(response))
        }).catch(error => {
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
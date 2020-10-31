import {handleError} from "../../common/functions/handleError";
import {LOAD_RECIPE_FAILED, LOAD_RECIPE_SUCCESSFUL, RESET_RECIPE} from "./Recipe.actions";
import {getRecipe} from "../../api/get.Recipe.api";
import {FAILED_TO_LOAD_RECIPES} from "../../common/translations/ResponseMessages";


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
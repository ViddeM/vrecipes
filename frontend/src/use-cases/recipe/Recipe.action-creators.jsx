import { handleError } from "../../common/functions/handleError";
import { LOAD_RECIPE_FAILED, LOAD_RECIPE_SUCCESSFUL, RESET_RECIPE } from "./Recipe.actions";
import { getRecipe } from "../../api/get.Recipe.api";


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
    return handleError(error, LOAD_RECIPE_FAILED, "Kunde in ladda recept :(");
}
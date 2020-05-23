import {GET_RECIPES_FAILED, GET_RECIPES_SUCCESSFUL, INIT} from "./App.actions";
import {getRecipes} from "../api/get.Recipes.api";
import {handleError} from "../common/functions/handleError";
import {initApi} from "../api/RequestUtilities";

export function initialize() {
    // let debug = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    let debug = false;
    if (process.env.DEBUG_MODE) {
        debug = true;
    }

    initApi(debug)

    return {
        type: INIT,
        payload: {
            debug: debug
        },
        error: false
    }
}

export function loadRecipes() {
    return dispatch => {
        getRecipes().then(response => {
            return dispatch(onLoadRecipesSuccessful(response))
        }).catch(error => {
            return dispatch(onLoadRecipesFailed(error))
        })
    }
}

function onLoadRecipesSuccessful(response) {
    console.log("GOT RESPONSE:: ", response);
    return {
        type: GET_RECIPES_SUCCESSFUL,
        payload: {
            response
        },
        error: false
    }
}

function onLoadRecipesFailed(error) {
    return handleError(error, GET_RECIPES_FAILED);
}
import {GET_RECIPES_FAILED, GET_RECIPES_SUCCESSFUL, INIT} from "./App.actions";
import {getRecipes} from "../api/get.Recipes.api";
import {handleError} from "../common/functions/handleError";
import {initApi} from "../api/RequestUtilities";
import {BETA_MODE, DEBUG_MODE, LIVE_MODE} from "../common/data/Mode";
import {FAILED_TO_LOAD_RECIPES} from "../common/translations/ResponseMessages";

export function initialize() {
    let mode = LIVE_MODE;

    if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
        let beta = process.env.REACT_APP_MODE === "beta"
        mode = beta ? BETA_MODE : DEBUG_MODE;
    }

    initApi(mode)

    return {
        type: INIT,
        payload: {
            mode: mode
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
    return {
        type: GET_RECIPES_SUCCESSFUL,
        payload: {
            response
        },
        error: false
    }
}

function onLoadRecipesFailed(error) {
    return handleError(error, GET_RECIPES_FAILED, FAILED_TO_LOAD_RECIPES);
}
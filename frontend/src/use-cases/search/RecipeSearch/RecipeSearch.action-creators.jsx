import {
    CREATE_RECIPE,
    GET_RECIPES_FAILED,
    GET_RECIPES_SUCCESSFUL,
    ON_SEARCH_FIELD_CHANGED,
    SEARCH_SET_FILTER_TAGS
} from "./RecipeSearch.actions";
import {authorizedApiCall} from "../../../common/functions/authorizedApiCall";
import {getRecipes} from "../../../api/get.Recipes.api";
import {handleError} from "../../../common/functions/handleError";
import {FAILED_TO_LOAD_RECIPES} from "../../../common/translations/ResponseMessages";

export function onSearchChanged(newValue) {
    return {
        type: ON_SEARCH_FIELD_CHANGED,
        payload: {
            newValue: newValue
        },
        error: false
    };
}

export function newRecipe() {
    return {
        type: CREATE_RECIPE,
        error: false
    }
}

export function loadRecipes() {
    return dispatch => {
        authorizedApiCall(getRecipes)
        .then(response => {
            if (response.error) {
                return dispatch(onLoadRecipesFailed(response.errResponse))
            } else {
                return dispatch(onLoadRecipesSuccessful(response.response))
            }
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

export function selectTags(tags) {
    return {
        type: SEARCH_SET_FILTER_TAGS,
        payload: {
            tags
        },
        error: false
    }
}
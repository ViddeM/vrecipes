import {
    ON_RECIPE_SAVE_AWAIT_RESPONSE,
    ON_RECIPE_SAVE_FAILED,
    ON_RECIPE_SAVE_SUCCESSFUL,
    ON_RECIPE_VALIDATION_FAILED
} from "./Create.actions";
import {postNewRecipe} from "../../api/post.NewRecipe.api";
import {handleError} from "../../common/functions/handleError";
import {putEditedRecipe} from "../../api/put.EditedRecipe.api";
import {authorizedApiCall} from "../../common/functions/authorizedApiCall";

export function onRecipeSave(recipe) {
    const errors = validateRecipe(recipe)

    if (Object.keys(errors).length === 0) {
        return dispatch => {
            dispatch({type: ON_RECIPE_SAVE_AWAIT_RESPONSE, error: false})
            authorizedApiCall(() => postNewRecipe(recipe))
                .then(response => {
                    if (response.error) {
                        dispatch(onRecipeSaveFailed(response.errResponse))
                    } else {
                        if (response.response.data.success === false) {
                            dispatch(onRecipeSaveFailed(response.response.data))
                        } else {
                            dispatch(onRecipeSaveSuccessful(response.response));
                        }
                    }
                })
                .catch(error => {
                    dispatch(onRecipeSaveFailed(error));
                })
        };
    }

    return {
        type: ON_RECIPE_VALIDATION_FAILED,
        payload: {
            errors: errors
        },
        error: false
    }
}

export function onEditedRecipeSave(recipe) {
    console.log("SAVE EDITED RECIPE?")
    const errors = validateRecipe(recipe)

    if (Object.keys(errors).length === 0) {
        return dispatch => {
            dispatch({type: ON_RECIPE_SAVE_AWAIT_RESPONSE, error: false})

            authorizedApiCall(() => putEditedRecipe(recipe))
                .then(response => {
                    if (response.error) {
                        dispatch(onRecipeSaveFailed(response.errResponse))
                    } else {
                        if (response.response.data.success === false) {
                            dispatch(onRecipeSaveFailed(response.response.data))
                        } else {
                            dispatch(onRecipeSaveSuccessful(response.response));
                        }
                    }
                })
                .catch(error => {
                    dispatch(onRecipeSaveFailed(error));
                })
        };
    }

    return {
        type: ON_RECIPE_VALIDATION_FAILED,
        payload: {
            errors: errors
        },
        error: false
    }
}

function onRecipeSaveSuccessful(response) {
    return {
        type: ON_RECIPE_SAVE_SUCCESSFUL,
        payload: {
            recipe: response.data.data.recipeUniqueName
        },
        error: false
    }
}

function onRecipeSaveFailed(error) {
    return handleError(error, ON_RECIPE_SAVE_FAILED, "Kunde inte spara recept, försök igen senare.");
}


function validateIngredients(state) {
    let ingredients = {}

    state.ingredients.forEach(ingredient => {
        const amountNotSet = ingredient.amount <= 0 || ingredient.amount === undefined
        const unitNotSet = ingredient.unit === ""

        let ingredientObj = {}
        if (amountNotSet && !unitNotSet) {
            ingredientObj["amount"] = "Specifiera mängd!"
        }

        if (unitNotSet && !amountNotSet) {
            ingredientObj["unit"] = "Specifiera enhet!"
        }

        if (ingredient.name.length <= 0) {
            ingredientObj["name"] = "Ej tom!"
        }

        if (Object.keys(ingredientObj).length > 0) {
            ingredients[ingredient.id] = ingredientObj
        }
    });

    return Object.keys(ingredients).length > 0 ?
        ingredients :
        null;
}

function validateSteps(state) {
    let steps = {}

    state.steps.forEach(step => {
        let stepObj = {}
        if (step.step.length <= 0) {
            stepObj["name"] = "Ej tom!"
        }

        if (Object.keys(stepObj).length > 0) {
            steps[step.id] = stepObj
        }
    });

    return Object.keys(steps).length > 0 ?
        steps :
        null;
}

function validateRecipe(state) {
    let errors = {}

    if (state.recipeName.length <= 0) {
        errors = {
            ...errors,
            name: "Receptet måste ha ett namn!"
        }
    }

    let ingredients = validateIngredients(state)
    if (ingredients !== null) {
        errors = {
            ...errors,
            ingredients: ingredients
        }
    }

    let steps = validateSteps(state)
    if (steps !== null) {
        errors = {
            ...errors,
            steps: steps
        }
    }

    return errors
}

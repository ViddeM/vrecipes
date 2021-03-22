import {DELETE_RECIPE_FAILED, DELETE_RECIPE_SUCCESSFUL, EDIT_RECIPE} from "./RecipeFooter.actions.view";
import {deleteRecipe} from "../../../../../../api/delete.Recipe.api";
import {handleError} from "../../../../../../common/functions/handleError";

export function editRecipe(recipe) {
    return {
        type: EDIT_RECIPE,
        payload: {
            recipe: recipe
        },
        error: false
    }
}

export function handleDeleteRecipe(recipeId) {
    return dispatch => {
        deleteRecipe(recipeId).then(response => {
            return dispatch(onDeleteRecipeSuccessful(response))
        }).catch(error => {
            return dispatch(onDeleteRecipeFailed(error))
        })
    }
}

function onDeleteRecipeSuccessful(response) {
    alert("Lyckades ta bort recept!")

    return {
        type: DELETE_RECIPE_SUCCESSFUL,
        payload: {
            response
        },
        error: false
    }
}

function onDeleteRecipeFailed(error) {
    alert("Misslyckades med att ta bort recept")
    return handleError(error, DELETE_RECIPE_FAILED)
}
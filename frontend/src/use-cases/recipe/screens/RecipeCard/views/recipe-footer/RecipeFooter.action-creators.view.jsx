import {EDIT_RECIPE} from "./RecipeFooter.actions.view";

export function editRecipe(recipe) {
    return {
        type: EDIT_RECIPE,
        payload: {
            recipe: recipe
        },
        error: false
    }
}
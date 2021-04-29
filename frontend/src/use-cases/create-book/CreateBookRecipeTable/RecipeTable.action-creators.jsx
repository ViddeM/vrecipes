import {ON_RECIPE_ROW_SELECTION_CHANGE} from "./RecipeTable.actions";

export function onRecipeTableRowSelectionChange(selected) {
    return {
        type: ON_RECIPE_ROW_SELECTION_CHANGE,
        payload: {
            selected: selected
        },
        error: false
    }
}
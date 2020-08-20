import {ON_INGREDIENT_DRAG_END} from "./CreateIngredients.actions.view";

export function onDragEnd(result) {
    return {
        type: ON_INGREDIENT_DRAG_END,
        payload: {
            result: result
        },
        error: false
    }
}
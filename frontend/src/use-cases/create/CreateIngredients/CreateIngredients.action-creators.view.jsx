import {
    ON_INGREDIENT_AMOUNT_CHANGE,
    ON_INGREDIENT_CREATED,
    ON_INGREDIENT_DRAG_END,
    ON_INGREDIENT_NAME_CHANGE,
    ON_INGREDIENT_REMOVED,
    ON_INGREDIENT_UNIT_CHANGE
} from "./CreateIngredients.actions.view";

export function onDragEnd(result) {
    return {
        type: ON_INGREDIENT_DRAG_END,
        payload: {
            result: result
        },
        error: false
    }
}

export function onIngredientCreated() {
    return {
        type: ON_INGREDIENT_CREATED,
        payload: {},
        error: false
    }
}

export function onIngredientAmountChange(newAmount, ingredientId) {
    return {
        type: ON_INGREDIENT_AMOUNT_CHANGE,
        payload: {
            newAmount: newAmount,
            ingredientId: ingredientId
        },
        error: false
    }
}


export function onIngredientNameChange(newName, ingredientId) {
    return {
        type: ON_INGREDIENT_NAME_CHANGE,
        payload: {
            newName: newName,
            ingredientId: ingredientId
        },
        error: false
    }
}

export function onIngredientUnitChange(newUnit, ingredientId) {
    return {
        type: ON_INGREDIENT_UNIT_CHANGE,
        payload: {
            newUnit: newUnit,
            ingredientId: ingredientId
        },
        error: false
    }
}

export function onIngredientRemoved(ingredientId) {
    return {
        type: ON_INGREDIENT_REMOVED,
        payload: {
            ingredientId: ingredientId
        },
        error: false
    }
}
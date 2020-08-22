import {
    ON_INGREDIENT_AMOUNT_CHANGE,
    ON_INGREDIENT_CREATED,
    ON_INGREDIENT_DRAG_END,
    ON_INGREDIENT_NAME_CHANGE,
    ON_INGREDIENT_REMOVED,
    ON_INGREDIENT_UNIT_CHANGE
} from "./CreateIngredients/CreateIngredients.actions.view";
import {
    ON_STEP_CREATED,
    ON_STEP_DESCRIPTION_CHANGE,
    ON_STEP_DRAG_END,
    ON_STEP_REMOVED
} from "./CreateSteps/CreateSteps.actions.view";
import {
    ON_COOKING_TIME_CHANGE,
    ON_DESCRIPTION_CHANGE,
    ON_NAME_CHANGE,
    ON_OVEN_TEMP_CHANGE
} from "./CreateGeneral/CreateGeneral.actions.view";

const initialState = {
    recipeName: "",
    ovenTemperature: undefined,
    cookingTime: undefined,
    description: "",
    ingredients: [],
    steps: []
}

export function create(state = initialState, action) {
    switch (action.type) {
        case ON_INGREDIENT_DRAG_END:
            const result = action.payload.result;
            if (!result.destination) {
                // The drag ended outside of the dropzone.
                return state;
            }

            return newState(state, {
                ingredients: reorderIngredients(state.ingredients, result.source.index, result.destination.index)
            });
        case ON_STEP_DRAG_END:
            const stepResult = action.payload.result;
            if (!stepResult.destination) {
                // The drag ended outside of the dropzone.
                return state;
            }

            return newState(state, {
                steps: reorderSteps(state.steps, stepResult.source.index, stepResult.destination.index)
            })
        case ON_NAME_CHANGE:
            return newState(state, {
                recipeName: action.payload.newName
            })
        case ON_DESCRIPTION_CHANGE:
            return newState(state, {
                description: action.payload.newDescription
            })
        case ON_OVEN_TEMP_CHANGE:
            const ovenTemp = validateNumber(action.payload.newTemp, state.ovenTemperature);
            return newState(state, {
                ovenTemperature: ovenTemp
            })
        case ON_COOKING_TIME_CHANGE:
            const cookingTime = validateNumber(action.payload.newCookingTime, state.cookingTime);
            return newState(state, {
                cookingTime: cookingTime
            })
        case ON_INGREDIENT_CREATED:
            return newIngredient(state);
        case ON_INGREDIENT_UNIT_CHANGE:
            return updateIngredientUnit(state, action.payload.newUnit, action.payload.ingredientId);
        case ON_INGREDIENT_NAME_CHANGE:
            return updateIngredientName(state, action.payload.newName, action.payload.ingredientId);
        case ON_INGREDIENT_AMOUNT_CHANGE:
            return updateIngredientAmount(state, action.payload.newAmount, action.payload.ingredientId);
        case ON_INGREDIENT_REMOVED:
            return removeIngredient(state, action.payload.ingredientId)
        case ON_STEP_CREATED:
            return newStep(state);
        case ON_STEP_DESCRIPTION_CHANGE:
            return updateStepDescription(state, action.payload.newDescription, action.payload.id);
        case ON_STEP_REMOVED:
            return removeStep(state, action.payload.id)
        default:
            return state;
    }
}

function validateNumber(newNumber, oldValue) {
    if (isNaN(newNumber)) {
        return oldValue;
    }

    return newNumber;
}


function newState(oldState, change) {
    return Object.assign({}, oldState, change);
}

function reorderIngredients(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

function reorderSteps(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result.map((step, index) => {
        step.number = index + 1;
        return step;
    });
}

function newIngredient(state) {
    return newState(state, {
        ingredients: [...state.ingredients, {
            id: getNextIngredientId(state),
            name: "",
            unit: "",
            amount: undefined
        }]
    })
}

function newStep(state) {
    return newState(state, {
        steps: [...state.steps, {
            id: getNextStepId(state),
            number: getNextStepNumber(state),
            step: ""
        }]
    })
}

function updateIngredientUnit(state, newUnit, ingredientId) {
    return newState(state, {
                        ingredients: state.ingredients.map(ingredient =>
                                                               ingredient.id === ingredientId ?
                                                                   {
                                                                       ...ingredient,
                                                                       unit: newUnit
                                                                   } :
                                                                   ingredient
                        )
                    }
    )
}

function updateIngredientName(state, newName, ingredientId) {
    return newState(state, {
                        ingredients: state.ingredients.map(ingredient =>
                                                               ingredient.id === ingredientId ?
                                                                   {
                                                                       ...ingredient,
                                                                       name: newName
                                                                   } :
                                                                   ingredient
                        )
                    }
    )
}

function updateIngredientAmount(state, newAmount, ingredientId) {
    if (isNaN(newAmount)) {
        return state;
    }

    return newState(state, {
                        ingredients: state.ingredients.map(ingredient =>
                                                               ingredient.id === ingredientId ?
                                                                   {
                                                                       ...ingredient,
                                                                       amount: newAmount
                                                                   } :
                                                                   ingredient
                        )
                    }
    )
}

function updateStepDescription(state, newDescription, id) {
    return newState(state, {
        steps: state.steps.map(step => step.id === id ? {
                ...step,
                step: newDescription
            } :
            step
        )
    })
}

function removeIngredient(state, id) {
    return newState(state, {
        ingredients: state.ingredients.filter(ingredient => ingredient.id !== id)
    });
}

function removeStep(state, id) {
    let newSteps = []
    let removed = null;
    state.steps.forEach(step => {
        if (step.id === id) {
            removed = step;
        }
    })

    if (removed === null) {
        return state;
    }

    state.steps.forEach(step => {
        if (step.id !== id) {
            step.number > removed.number ?
                newSteps.push(
                    {
                        ...step,
                        number: step.number - 1
                    }) :
                newSteps.push(step);
        }
    })

    return newState(state, {
        steps: newSteps
    })
}

function getNextIngredientId(state) {
    // FIXME: Quick solution, maybe create a better in the future.
    let highest = 0;
    state.ingredients.forEach(ingredient => {
        if (ingredient.id > highest) {
            highest = ingredient.id;
        }
    })
    return highest + 1;
}

function getNextStepId(state) {
    // FIXME: Quick solution, maybe create a better in the future.
    let highest = 0;
    state.steps.forEach(step => {
        if (step.id > highest) {
            highest = step.id
        }
    })
    return highest + 1;
}

function getNextStepNumber(state) {
    // FIXME: Quick solution, maybe create a better in the future.
    let highest = 0;
    state.steps.forEach(step => {
        if (step.number > highest) {
            highest = step.number;
        }
    })
    return highest + 1;
}
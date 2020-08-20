import {ON_INGREDIENT_DRAG_END} from "./CreateIngredients/CreateIngredients.actions.view";
import {ON_STEP_DRAG_END} from "./CreateSteps/CreateSteps.actions.view";
import {
    ON_COOKING_TIME_CHANGE,
    ON_DESCRIPTION_CHANGE,
    ON_NAME_CHANGE,
    ON_OVEN_TEMP_CHANGE
} from "./CreateGeneral/CreateGeneral.actions.view";

const initialState = {
    recipeName: "Some recipe name",
    ovenTemperature: 135,
    cookingTime: 90,
    description: "Some long description",
    ingredients: [
        {
            id: 0,
            name: "Smör",
            unit: "g",
            amount: 10
        },
        {
            id: 1,
            name: "Mjöl",
            unit: "dl",
            amount: 3
        },
        {
            id: 2,
            name: "Socker",
            unit: "dl",
            amount: 2
        }
    ],
    steps: [
        {
            id: 0,
            number: 1,
            step: "Stek smöret i smöret"
        },
        {
            id: 1,
            number: 2,
            step: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod purus justo, sed convallis purus maximus sit amet. Nullam interdum nunc in lorem mollis, in rhoncus urna hendrerit. Nunc elementum nibh velit, rutrum convallis nisi scelerisque sit amet. Suspendisse purus mi, suscipit ac aliquam sed, blandit ornare libero. Nulla hendrerit enim in ornare ultrices. Nullam bibendum diam eget facilisis posuere. Vivamus turpis sapien, pulvinar a nisi vitae, scelerisque varius eros. Phasellus dolor velit, lacinia id gravida id, vulputate at purus.\n"
        },
        {
            id: 2,
            number: 3,
            step: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod purus justo, sed convallis purus maximus sit amet. Nullam interdum nunc in lorem mollis, in rhoncus urna hendrerit. Nunc elementum nibh velit, rutrum convallis nisi scelerisque sit amet. Suspendisse purus mi, suscipit ac aliquam sed, blandit ornare libero. Nulla hendrerit enim in ornare ultrices. Nullam bibendum diam eget facilisis posuere. Vivamus turpis sapien, pulvinar a nisi vitae, scelerisque varius eros. Phasellus dolor velit, lacinia id gravida id, vulputate at purus.\n"
        },
    ]
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
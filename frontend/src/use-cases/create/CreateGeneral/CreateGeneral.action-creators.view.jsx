import {
    ON_COOKING_TIME_CHANGE,
    ON_DESCRIPTION_CHANGE,
    ON_NAME_CHANGE,
    ON_OVEN_TEMP_CHANGE
} from "./CreateGeneral.actions.view";

export function onNameChange(newName) {
    return {
        type: ON_NAME_CHANGE,
        payload: {
            newName: newName.target.value
        },
        error: false
    }
}

export function onDescriptionChange(newDescription) {
    return {
        type: ON_DESCRIPTION_CHANGE,
        payload: {
            newDescription: newDescription.target.value
        },
        error: false
    }
}

export function onOvenTempChange(newTemp) {
    return {
        type: ON_OVEN_TEMP_CHANGE,
        payload: {
            newTemp: newTemp.target.value
        },
        error: false
    }
}

export function onCookingTimeChange(newCookingTime) {
    return {
        type: ON_COOKING_TIME_CHANGE,
        payload: {
            newCookingTime: newCookingTime.target.value
        },
        error: false
    }
}
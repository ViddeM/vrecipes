import {
    ON_STEP_CREATED,
    ON_STEP_DESCRIPTION_CHANGE,
    ON_STEP_DRAG_END,
    ON_STEP_REMOVED
} from "./CreateSteps.actions.view";

export function onDragEnd(result) {
    return {
        type: ON_STEP_DRAG_END,
        payload: {
            result: result
        },
        error: false
    }
}

export function onStepCreated() {
    return {
        type: ON_STEP_CREATED,
        payload: {},
        error: false
    }
}


export function onStepDescriptionChange(newDescription, id) {
    return {
        type: ON_STEP_DESCRIPTION_CHANGE,
        payload: {
            newDescription: newDescription,
            id: id
        },
        error: false
    }
}


export function onStepRemoved(id) {
    return {
        type: ON_STEP_REMOVED,
        payload: {
            id: id
        },
        error: false
    }
}

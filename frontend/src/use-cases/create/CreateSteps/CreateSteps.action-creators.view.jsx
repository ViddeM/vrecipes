import {ON_STEP_DRAG_END} from "./CreateSteps.actions.view";

export function onDragEnd(result) {
    return {
        type: ON_STEP_DRAG_END,
        payload: {
            result: result
        },
        error: false
    }
}
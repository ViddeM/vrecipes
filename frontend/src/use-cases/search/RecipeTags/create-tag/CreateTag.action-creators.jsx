import {
    ON_CREATE_NEW_TAG_AWAIT_RESPONSE,
    ON_CREATE_NEW_TAG_FAILED,
    ON_CREATE_NEW_TAG_SUCCESSFUL,
    ON_EDIT_TAG_SAVE_FAILED
} from "./CreateTag.actions";
import {authorizedApiCall} from "../../../../common/functions/authorizedApiCall";
import {postNewTag} from "../../../../api/post.NewTag.api";
import {handleError} from "../../../../common/functions/handleError";
import {putEditedTag} from "../../../../api/put.EditedTag.api";

export function createNewTag(name, description, rgb) {
    return dispatch => {
        dispatch({type: ON_CREATE_NEW_TAG_AWAIT_RESPONSE, error: false})
        authorizedApiCall(() => postNewTag(name, description, rgb))
        .then(response => {
            if (response.error) {
                dispatch(onTagSaveFailed(response.errResponse))
            } else {
                if (response.response.data.success === false) {
                    dispatch(onTagSaveFailed(response.response.data));
                } else {
                    dispatch(onTagSaveSuccessful(response.response));
                }
            }
        })
    }
}

export function saveEditTag(id, name, description, rgb) {
    return dispatch => {
        authorizedApiCall(() => putEditedTag(id, name, description, rgb))
        .then(response => {
            if (response.error) {
                dispatch(onEditTagSaveFailed(response.errResponse))
            } else {
                if (response.response.data.success === false) {
                    dispatch(onEditTagSaveFailed(response.response.data))
                } else {
                    dispatch(onTagSaveSuccessful(response.response))
                }
            }
        })
    }
}

function onEditTagSaveFailed(error) {
    return handleError(error, ON_EDIT_TAG_SAVE_FAILED, "Kunde inte spara tagg")
}

function onTagSaveFailed(error) {
    return handleError(error, ON_CREATE_NEW_TAG_FAILED, "Kunde inte skapa tagg");
}

function onTagSaveSuccessful() {
    return {
        type: ON_CREATE_NEW_TAG_SUCCESSFUL,
        payload: {},
        error: false
    }
}

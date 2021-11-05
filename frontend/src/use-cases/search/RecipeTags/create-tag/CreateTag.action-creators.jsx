import {
    ON_CREATE_NEW_TAG_AWAIT_RESPONSE,
    ON_CREATE_NEW_TAG_ERROR,
    ON_CREATE_NEW_TAG_SUCCESSFUL
} from "./CreateTag.actions";
import {authorizedApiCall} from "../../../../common/functions/authorizedApiCall";
import {postNewTag} from "../../../../api/post.NewTag.api";
import {handleError} from "../../../../common/functions/handleError";

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

function onTagSaveFailed(error) {
    return handleError(error, ON_CREATE_NEW_TAG_ERROR, "Kunde inte skapa tagg");
}

function onTagSaveSuccessful() {
    return {
        type: ON_CREATE_NEW_TAG_SUCCESSFUL,
        payload: {},
        error: false
    }
}
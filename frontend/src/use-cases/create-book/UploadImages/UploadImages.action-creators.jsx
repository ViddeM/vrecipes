import {authorizedApiCall} from "../../../common/functions/authorizedApiCall";
import {putImage} from "../../../api/put.Image.api";
import {handleError} from "../../../common/functions/handleError";
import {
    REMOVE_BOOK_IMAGE, UPLOAD_BOOK_IMAGE_AWAIT_RESPONSE,
    UPLOAD_BOOK_IMAGE_FAILED,
    UPLOAD_BOOK_IMAGE_SUCCESSFUL
} from "./UploadImages.actions";

export function uploadBookImage(file) {
    return dispatch => {
        dispatch({type: UPLOAD_BOOK_IMAGE_AWAIT_RESPONSE, error: false})

        authorizedApiCall(() => putImage(file))
        .then(response => {
            if (response.error) {
                dispatch(onUploadImageFailed(response.errResponse))
            } else {
                dispatch(onUploadImageSuccessful(response.response))
            }
        })
        .catch(error => {
            dispatch(onUploadImageFailed(error))
        })
    }
}

function onUploadImageSuccessful(response) {
    return {
        type: UPLOAD_BOOK_IMAGE_SUCCESSFUL,
        payload: {
            image_id: response.data.data.id,
            image_url: response.data.data.url
        },
        error: false
    }
}

function onUploadImageFailed(error) {
    return handleError(error, UPLOAD_BOOK_IMAGE_FAILED, "Kunde inte ladda upp bild");
}

export function removeBookImage() {
    return {
        type: REMOVE_BOOK_IMAGE,
        error: false
    }
}
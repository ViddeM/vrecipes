import {UPLOAD_IMAGE_AWAIT_RESPONSE, UPLOAD_IMAGE_FAILED, UPLOAD_IMAGE_SUCCESSFUL} from "./UploadImages.actions";
import {putImage} from "../../../api/put.Image.api";
import {handleError} from "../../../common/functions/handleError";

export function uploadImage(file) {
    return dispatch => {
        dispatch({type: UPLOAD_IMAGE_AWAIT_RESPONSE, error: false})
        putImage(file)
            .then(response => {
                dispatch(onUploadImageSuccessful(response))
            })
            .catch(error => {
                dispatch(onUploadImageFailed(error))
            })
    }
}

function onUploadImageSuccessful(response) {
    return {
        type: UPLOAD_IMAGE_SUCCESSFUL,
        payload: {
            image_id: response.data.data.id,
            image_url: response.data.data.url
        },
        error: false
    }
}

function onUploadImageFailed(error) {
    return handleError(error, UPLOAD_IMAGE_FAILED, "Kunde inte ladda upp bild");
}
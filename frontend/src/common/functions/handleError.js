import {DEFAULT_ERROR, translate} from "../translations/ResponseMessages";

export function handleError(error, type, defaultMessage = DEFAULT_ERROR) {
    let msg = defaultMessage;

    let errorData = ""
    if (error.message && error.response.data && error.response.data.error) {
        errorData = error.response.data.error.message
    } else if (error.error) {
        errorData = error.error
    }

    if (errorData !== "") {
        msg = translate(errorData);
    } else {
        console.log("ERROR: ", error)
        msg += ", fel: (" + error.message + ")";
    }

    return {
        type: type,
        payload: {
            message: msg
        },
        error: true
    };
}
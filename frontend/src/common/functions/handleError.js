import {DEFAULT_ERROR, translate} from "../translations/ResponseMessages";

export function handleError(error, type, defaultMessage = DEFAULT_ERROR) {
    let msg = defaultMessage;

    let errorData = ""
    if (error.response && error.response.data && error.response.data.error) {
        errorData = error.response.data.error
    } else if (error.error) {
        errorData = error.error
    }

    if (errorData !== "" && errorData !== undefined) {
        msg = translate(errorData);
    } else {
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
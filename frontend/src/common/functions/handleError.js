import {DEFAULT_ERROR, translate} from "../translations/ResponseMessages";

export function handleError(error, type, defaultMessage = DEFAULT_ERROR) {
    let msg = defaultMessage;

    if (error.response && error.response.data && error.response.data.error) {
        msg = translate(error.response.data.error.message);
    } else {
        msg += "fel: (" + error.message + ")";
    }

    return {
        type: type,
        payload: {
            message: msg
        },
        error: true
    };
}
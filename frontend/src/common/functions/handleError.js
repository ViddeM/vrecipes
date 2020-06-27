export function handleError(error, type, defaultMessage = "Woops, något gick fel :(") {
    let msg = defaultMessage;

    if (error.response && error.response.data && error.response.data.error) {
        msg = error.response.data.error;
    } else {
        msg += " fel: (" + error.message + ")";
    }

    return {
        type: type,
        payload: {
            message: msg
        },
        error: true
    };
}
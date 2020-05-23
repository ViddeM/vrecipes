export function handleError(error, type) {
    let msg = "Woops, something went wrong.";
    if (error.response) {
        let data = error.response.data;
        if (data && data.error) {
            msg = data.error;
        }
    }

    return {
        type: type,
        payload: {
            message: msg
        },
        error: true
    };
}
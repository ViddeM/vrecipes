export async function authorizedApiCall(call) {
    return call()
        .then(response => {
            return {
                error: false,
                response: response
            }
        })
        .catch(error => {
            if (error.response && error.response.status === 401 && window.location.pathname !== "/login") {
                window.location.assign("/login")
            }

            return {
                error: true,
                errResponse: error
            }
        })
}
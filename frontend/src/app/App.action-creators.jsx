import {GET_ME_FAILED, GET_ME_SUCCESSFUL, INIT, ON_LOGOUT} from "./App.actions";
import {BETA_MODE, DEBUG_MODE, LIVE_MODE} from "../common/data/Mode";
import {authorizedApiCall} from "../common/functions/authorizedApiCall";
import {getMe} from "../api/get.Me.api";
import {handleError} from "../common/functions/handleError";
import {postLogout} from "../api/post.Logout.api";

export function initialize() {
    let mode = LIVE_MODE;

    if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
        let beta = process.env.REACT_APP_MODE === "beta"
        mode = beta ? BETA_MODE : DEBUG_MODE;
    }

    return dispatch => {
        dispatch({
            type: INIT,
            payload: {
                mode: mode
            },
            error: false
        })

        authorizedApiCall(() => getMe())
            .then(response => {
                if (response.error) {
                    dispatch(onGetMeFailed(response.errResponse))
                } else {
                    if (response.response.data.success === false) {
                        dispatch(onGetMeFailed(response.response.data))
                    } else {
                        dispatch(onGetMeSuccessful(response.response))
                    }
                }
            })
            .catch(error => {
                dispatch(onGetMeFailed(error))
            })
    }
}

function onGetMeSuccessful(response) {
    return {
        type: GET_ME_SUCCESSFUL,
        payload: {
            name: response.data.data.name,
            email: response.data.data.email
        },
        error: false
    }
}

function onGetMeFailed(error) {
    return handleError(error, GET_ME_FAILED)
}

export function logout() {
    return dispatch => {
        postLogout()
            .then(response => {
            })
            .catch(error => {
            })

        dispatch({
            type: ON_LOGOUT,
            error: false
        })
    }
}
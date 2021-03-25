import {INIT} from "./App.actions";
import {initApi} from "../api/RequestUtilities";
import {BETA_MODE, DEBUG_MODE, LIVE_MODE} from "../common/data/Mode";

export function initialize() {
    let mode = LIVE_MODE;

    if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
        let beta = process.env.REACT_APP_MODE === "beta"
        mode = beta ? BETA_MODE : DEBUG_MODE;
    }

    initApi(mode)

    return {
        type: INIT,
        payload: {
            mode: mode
        },
        error: false
    }
}
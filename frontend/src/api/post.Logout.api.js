import {postRequest} from "./RequestUtilities";

export function postLogout() {
    return postRequest("/auth/logout", {});
}

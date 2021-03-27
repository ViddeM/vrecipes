import {getRequest} from "./RequestUtilities";

export function getMe() {
    return getRequest("/me");
}
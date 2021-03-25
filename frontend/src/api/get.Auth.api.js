import {getRequest} from "./RequestUtilities";

export function getAuth(provider) {
    return getRequest("/auth/" + provider);
}
import {getRequest} from "./RequestUtilities";

export function getTags() {
    return getRequest("/tags");
}
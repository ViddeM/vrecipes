import {deleteRequest} from "./RequestUtilities";

export function deleteTag(tagId) {
    return deleteRequest("/tags/" + tagId)
}

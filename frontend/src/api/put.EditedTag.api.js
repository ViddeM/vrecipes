import {putRequest} from "./RequestUtilities";

export function putEditedTag(id, name, description, color) {
    const data = {
        name: name,
        description: description,
        color: color
    }
    return putRequest("/tags/" + id, data);
}

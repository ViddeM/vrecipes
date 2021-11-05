import {postRequest} from "./RequestUtilities";

export function postNewTag(name, description, rgb) {
    const data = {
        name: name,
        description: description,
        color: rgb
    }
    return postRequest("/tags", data);
}
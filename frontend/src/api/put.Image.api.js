import {putRequest} from "./RequestUtilities";

export function putImage(image) {
    const data = new FormData();
    data.append("file", image);
    return putRequest("/recipe/image/upload", data);
}
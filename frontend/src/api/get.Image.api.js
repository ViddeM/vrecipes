import {toUrl} from "./RequestUtilities";

export function getImageUrl(imageName) {
    return toUrl("/images/" + imageName)
}
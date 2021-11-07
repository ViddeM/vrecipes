export function tagNameToUnique(tagName) {
    return tagName.toLowerCase().replaceAll(" ", "_")
}
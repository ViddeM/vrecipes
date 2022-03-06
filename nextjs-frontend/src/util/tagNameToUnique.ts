export function tagNameToUnique(tagName: string): String {
  return tagName.toLowerCase().replace(/ /g, "_");
}

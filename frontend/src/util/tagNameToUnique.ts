export function tagNameToUnique(tagName: string): string {
  return tagName.toLowerCase().replace(/ /g, "_");
}

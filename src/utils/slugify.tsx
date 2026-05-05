export function slugify(text: string): string {
  return text
    .toLowerCase()            // convert to lowercase
    .trim()                   // remove whitespace at start/end
    .replace(/[\s\W-]+/g, "-") // replace spaces & special chars with hyphen
    .replace(/^-+|-+$/g, ""); // remove leading/trailing hyphens
}
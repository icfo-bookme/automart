export function deslugify(slug: string | null | undefined): string {
  if (!slug) return "All Product";
  return slug
    .trim()
    .replace(/-/g, " ")                
    .replace(/\b\w/g, char => char.toUpperCase()); 
}

// Laravel compatible error interface
export interface IInputErrorState {
  success: boolean;
  errors: Record<string, string[]>; // Laravel returns errors as object
}


export const getInputFieldError = (
  fieldName: string,
  state: IInputErrorState | null
): string | null => {
  if (!state || !state.errors) return null;

  // Laravel error structure: errors[fieldName] = string[]
  return state.errors[fieldName]?.[0] ?? null;
};

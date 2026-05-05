import { getInputFieldError, IInputErrorState } from "@/lib/getInputFieldError";
import { FieldDescription } from "../ui/field";

interface InputFieldErrorProps {
  field: string;
  state?: IInputErrorState | null;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
  const error = getInputFieldError(field, state ?? null);

  if (!error) return null;

  return <FieldDescription className="text-red-600">{error}</FieldDescription>;
};

export default InputFieldError;

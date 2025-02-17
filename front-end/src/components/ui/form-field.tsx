import { Label } from "./label";
import { Input } from "./input";

interface FormFieldProps {
  label: string;
  registerInput: object;
  name: string;
  error?: string;
}
export default function InputFormField({
  label,
  registerInput,
  name,
  error,
}: FormFieldProps) {
  return (
    <div className="grid grid-cols-4 items-center gap-4 relative">
      <Label htmlFor={name} className="text-right">
        {label}
      </Label>
      <Input {...registerInput} data-testid={name}  className="col-span-3" />
      {error && (
        <span className="text-red-500 text-xs text-right mt-[-10] col-span-4">
          {error}
        </span>
      )}
    </div>
  );
}

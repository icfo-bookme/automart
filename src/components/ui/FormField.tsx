import { AlertCircle } from "lucide-react";

interface FieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
    icon?: React.ReactNode;
    placeholder?: string;
    type?: string;
    required?: boolean;
    textarea?: boolean;
    rows?: number;
    rightElement?: React.ReactNode;
}
export default function Field({
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    icon,
    placeholder,
    type = 'text',
    required,
    textarea,
    rows = 3,
    rightElement,
}: FieldProps) {
    const baseInput =
        'block w-full rounded-xl border bg-gray-50 py-3 text-sm text-gray-900 placeholder-gray-400 ' +
        'transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ' +
        (error
            ? 'border-red-400 focus:ring-red-300'
            : 'border-gray-200 focus:ring-blue-300 focus:border-blue-400');

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>

            <div className="relative">
                {icon && !textarea && (
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </span>
                )}

                {textarea ? (
                    <textarea
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        rows={rows}
                        placeholder={placeholder}
                        className={`${baseInput} px-4 resize-none`}
                        aria-describedby={error ? `${name}-error` : undefined}
                    />
                ) : (
                    <input
                        id={name}
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        className={`${baseInput} ${icon ? 'pl-10' : 'px-4'} ${rightElement ? 'pr-10' : error && !rightElement ? 'pr-10' : 'pr-4'}`}
                        aria-describedby={error ? `${name}-error` : undefined}
                    />
                )}

                {/* Right element (e.g. eye toggle) takes priority over error icon */}
                {rightElement ? (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</span>
                ) : (
                    error &&
                    !textarea && (
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                            <AlertCircle className="h-4 w-4" />
                        </span>
                    )
                )}
            </div>

            {error && (
                <p id={`${name}-error`} role="alert" className="flex items-center gap-1 text-xs text-red-500 mt-0.5">
                    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                    {error}
                </p>
            )}
        </div>
    );
}
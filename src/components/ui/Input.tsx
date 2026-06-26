import { useId, type FC, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
  className?: string;
  wrapperClassName?: string;
}

export const Input: FC<IInputProps> = (props) => {
  const {
    label,
    error,
    className,
    wrapperClassName,
    id,
    type = "text",
    ...rest
  } = props;

  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasError = Boolean(error);

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <input
        data-component-name="ui/Input"
        id={inputId}
        type={type}
        aria-invalid={hasError}
        className={cn(
          "h-10 w-full rounded-base border bg-card px-3 text-sm text-foreground",
          "placeholder:text-muted-foreground",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          hasError
            ? "border-destructive focus-visible:ring-destructive"
            : "border-input focus-visible:ring-ring",
          className,
        )}
        {...rest}
      />

      {hasError && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

Input.displayName = "ui/Input";

export default Input;

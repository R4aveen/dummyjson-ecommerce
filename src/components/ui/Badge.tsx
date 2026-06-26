import type { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "destructive";

interface IBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border border-border text-foreground",
  destructive: "bg-destructive text-destructive-foreground",
};

export const Badge: FC<IBadgeProps> = (props) => {
  const { children, variant = "primary", className, ...rest } = props;

  return (
    <span
      data-component-name="ui/Badge"
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5",
        "text-xs font-medium leading-none",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

Badge.displayName = "ui/Badge";

export default Badge;

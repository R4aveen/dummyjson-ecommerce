import type { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ICardBaseProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export const Card: FC<ICardBaseProps> = ({ children, className, ...rest }) => (
  <div
    data-component-name="ui/Card"
    className={cn(
      "flex flex-col overflow-hidden rounded-base border border-border",
      "bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...rest}
  >
    {children}
  </div>
);
Card.displayName = "ui/Card";

export const CardHeader: FC<ICardBaseProps> = ({ children, className, ...rest }) => (
  <div
    data-component-name="ui/CardHeader"
    className={cn("flex flex-col gap-1 p-4", className)}
    {...rest}
  >
    {children}
  </div>
);
CardHeader.displayName = "ui/CardHeader";

interface ICardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  className?: string;
}

export const CardTitle: FC<ICardTitleProps> = ({ children, className, ...rest }) => (
  <h3
    data-component-name="ui/CardTitle"
    className={cn("text-lg font-semibold leading-tight", className)}
    {...rest}
  >
    {children}
  </h3>
);
CardTitle.displayName = "ui/CardTitle";

export const CardDescription: FC<ICardBaseProps> = ({ children, className, ...rest }) => (
  <p
    data-component-name="ui/CardDescription"
    className={cn("text-sm text-muted-foreground", className)}
    {...rest}
  >
    {children}
  </p>
);
CardDescription.displayName = "ui/CardDescription";

export const CardContent: FC<ICardBaseProps> = ({ children, className, ...rest }) => (
  <div
    data-component-name="ui/CardContent"
    className={cn("p-4 pt-0", className)}
    {...rest}
  >
    {children}
  </div>
);
CardContent.displayName = "ui/CardContent";

export const CardFooter: FC<ICardBaseProps> = ({ children, className, ...rest }) => (
  <div
    data-component-name="ui/CardFooter"
    className={cn("mt-auto flex items-center gap-2 p-4 pt-0", className)}
    {...rest}
  >
    {children}
  </div>
);
CardFooter.displayName = "ui/CardFooter";

export default Card;

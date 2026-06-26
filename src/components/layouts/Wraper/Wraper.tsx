import type { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface IWraperProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export const Wraper: FC<IWraperProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div
      data-component-name="layouts/Wraper"
      className={cn(
        "flex w-full flex-col min-h-[calc(100dvh-var(--header-height,0px))]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

Wraper.displayName = "layouts/Wraper";

export default Wraper;

import type { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

interface IContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  size?: ContainerSize;
}

const sizes: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[96rem]",
  full: "max-w-full",
};

export const Container: FC<IContainerProps> = (props) => {
  const { children, className, size = "lg", ...rest } = props;

  return (
    <div
      data-component-name="layouts/Container"
      // className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)}
      className={cn("mx-auto w-full", sizes[size], className)}
      {...rest}
    >
      {children}
    </div>
  );
};

Container.displayName = "layouts/Container";

export default Container;

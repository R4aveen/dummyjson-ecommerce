import { useEffect, type FC, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface IPageWraperProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  title?: string;
  name?: string;

}

export const PageWraper: FC<IPageWraperProps> = (props) => {
  const { children, className, title, name, ...rest } = props;

  useEffect(() => {
    if (name && title) document.title = `${name} | ${title}`;
    else if (title) document.title = title;
    else if (name) document.title = name;
  }, [name, title]);

  return (
    <main
      data-component-name="layouts/PageWraper"
      className={cn("flex w-full grow flex-col py-6", className)}
      {...rest}
    >
      {children}
    </main>
  );
};

PageWraper.displayName = "layouts/PageWraper";

export default PageWraper;

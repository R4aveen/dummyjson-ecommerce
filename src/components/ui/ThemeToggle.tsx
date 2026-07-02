import type { FC } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";

interface IThemeToggleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export const ThemeToggle: FC<IThemeToggleProps> = (props) => {
  const { variant = "ghost", size = "icon", className } = props;
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={toggleTheme}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
    >
      <span aria-hidden="true" className="text-base leading-none hover:cursor-pointer">
        {isDark ? "☀️" : "🌙"}
      </span>
    </Button>
  );
};

ThemeToggle.displayName = "ui/ThemeToggle";

export default ThemeToggle;

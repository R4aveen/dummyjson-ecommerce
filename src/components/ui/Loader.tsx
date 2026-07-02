interface LoaderProps {
  label?: string;
}

export const Loader = ({ label = "Cargando productos..." }: LoaderProps) => (
  <div role="status" className="flex flex-col items-center justify-center gap-3 py-16">
    <span className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

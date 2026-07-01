interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div role="alert" className="mx-auto my-12 max-w-md rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center">
    <p className="text-lg font-semibold text-red-700">Algo salió mal</p>
    <p className="mt-2 text-sm text-red-600">{message}</p>
    <p className="mt-4 text-xs text-red-400">Revisa tu conexión e intenta nuevamente.</p>
  </div>
);

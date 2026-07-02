import { CardIcon, RefreshIcon, ShieldIcon, TruckIcon } from "@/components/ui/Icons";

const benefits = [
  {
    title: "Envío rápido",
    description: "Despachos en 3 a 5 días hábiles a todo el país.",
    icon: TruckIcon,
  },
  {
    title: "Garantía real",
    description: "Todos los productos incluyen garantía del fabricante.",
    icon: ShieldIcon,
  },
  {
    title: "Devoluciones simples",
    description: "Hasta 30 días para cambiar de opinión sin costo.",
    icon: RefreshIcon,
  },
  {
    title: "Pago seguro",
    description: "Tus datos protegidos en cada transacción.",
    icon: CardIcon,
  },
];

export const Benefits = () => (
  <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {benefits.map(({ title, description, icon: Icon }) => (
        <li key={title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
          <span className="rounded-xl bg-accent/10 p-2.5 text-accent">
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

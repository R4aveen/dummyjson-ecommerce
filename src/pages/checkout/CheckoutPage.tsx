import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { PageWraper, Container } from "@/components/layouts";
import { Button, Card, Input, Loader } from "@/components/ui";
import { formatPrice } from "@/utils/format";
import pagesConfig from "@/config/page.config";
import { ChevronLeftIcon, ShieldIcon, TruckIcon } from "@/components/ui/Icons";

interface FormErrors {
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  zipCode?: string;
}

export const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card"); // card, paypal, cod

  // UI State
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shippingFee = cartTotal > 150 ? 0 : 9.99;
  const orderTotal = cartTotal + shippingFee;

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!name.trim()) tempErrors.name = "El nombre completo es requerido";
    if (!email.trim()) {
      tempErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Introduce un correo electrónico válido";
    }
    if (!address.trim()) tempErrors.address = "La dirección de envío es requerida";
    if (!city.trim()) tempErrors.city = "La ciudad es requerida";
    if (!zipCode.trim()) {
      tempErrors.zipCode = "El código postal es requerido";
    } else if (!/^\d{5,10}$/.test(zipCode.trim())) {
      tempErrors.zipCode = "Introduce un código postal válido (5-10 dígitos)";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment process delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      const generatedOrderId = `VT-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedOrderId);
      clearCart();
    }, 2500);
  };

  // 1. Success State
  if (isCompleted) {
    return (
      <PageWraper name="Orden Completada" title="Voltio">
        <Container className="flex max-w-xl flex-col items-center justify-center py-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
            <svg
              className="h-10 w-10 animate-in zoom-in duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-foreground">¡Compra realizada con éxito!</h1>
          <p className="mt-2 text-muted-foreground">
            Gracias por comprar en Voltio. Tu pedido ha sido procesado correctamente.
          </p>

          <Card className="mt-8 w-full p-6 text-left border-border bg-card">
            <h2 className="text-base font-semibold text-foreground border-b border-border pb-3">Detalles del pedido</h2>
            <div className="mt-4 space-y-2.5 text-sm text-card-foreground">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID de Pedido:</span>
                <span className="font-semibold text-foreground">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Destinatario:</span>
                <span className="font-medium">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dirección:</span>
                <span className="font-medium text-right max-w-[200px] truncate">{address}, {city}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="text-muted-foreground font-semibold">Total Pagado:</span>
                <span className="font-bold text-primary">{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </Card>

          <Button
            variant="primary"
            onClick={() => navigate(pagesConfig.shopPage.to)}
            className="mt-8 rounded-full px-8 py-3 text-sm font-semibold shadow-md hover:scale-105 transition-transform"
          >
            Continuar comprando
          </Button>
        </Container>
      </PageWraper>
    );
  }

  // 2. Loading State
  if (isProcessing) {
    return (
      <PageWraper name="Procesando Pago" title="Voltio">
        <Container className="flex flex-col items-center justify-center py-24 text-center">
          <Loader label="Verificando transacción y reservando stock..." />
          <p className="mt-2 text-xs text-muted-foreground max-w-xs">
            Por favor, no recargues la página ni cierres el navegador.
          </p>
        </Container>
      </PageWraper>
    );
  }

  // 3. Empty Cart State
  if (cartItems.length === 0) {
    return (
      <PageWraper name="Checkout" title="Voltio">
        <Container className="flex flex-col items-center justify-center py-20 text-center">
          <div className="rounded-full bg-secondary p-6 text-muted-foreground">
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-bold text-foreground">Tu carrito está vacío</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            No hay ningún artículo listo para pagar en este momento.
          </p>
          <Button
            variant="primary"
            onClick={() => navigate(pagesConfig.shopPage.to)}
            className="mt-6 rounded-full px-8 py-2.5 text-sm font-semibold hover:scale-105 transition-transform"
          >
            Ir al catálogo
          </Button>
        </Container>
      </PageWraper>
    );
  }

  // 4. Default Form state
  return (
    <PageWraper name="Checkout" title="Voltio">
      <Container className="py-10">
        <Link
          to={pagesConfig.shopPage.to}
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary mb-6"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Volver a la tienda
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-8">Finalizar Compra</h1>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <Card className="p-6 border-border bg-card">
                <h2 className="text-lg font-bold text-foreground mb-4">Información de Envío</h2>
                <div className="space-y-4">
                  <Input
                    label="Nombre Completo"
                    placeholder="Juan Pérez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    disabled={isProcessing}
                  />
                  <Input
                    label="Correo Electrónico"
                    type="email"
                    placeholder="juan.perez@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    disabled={isProcessing}
                  />
                  <Input
                    label="Dirección de Envío"
                    placeholder="Av. Providencia 1234, Depto 45"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    error={errors.address}
                    disabled={isProcessing}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Ciudad"
                      placeholder="Santiago"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      error={errors.city}
                      disabled={isProcessing}
                    />
                    <Input
                      label="Código Postal"
                      placeholder="7500000"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      error={errors.zipCode}
                      disabled={isProcessing}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border bg-card">
                <h2 className="text-lg font-bold text-foreground mb-4">Método de Pago</h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all hover:bg-secondary/40 hover:cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    <svg className="h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <span className="text-xs font-semibold">Tarjeta de Crédito</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all hover:bg-secondary/40 hover:cursor-pointer ${
                      paymentMethod === "paypal"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    <svg className="h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="text-xs font-semibold">PayPal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all hover:bg-secondary/40 hover:cursor-pointer ${
                      paymentMethod === "cod"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    <svg className="h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-xs font-semibold">Efectivo contra Entrega</span>
                  </button>
                </div>
              </Card>

              <Button
                type="submit"
                variant="primary"
                className="w-full rounded-xl py-3.5 text-sm font-semibold shadow-md shadow-primary/20 hover:scale-[1.01] transition-transform"
              >
                Completar Pedido ({formatPrice(orderTotal)})
              </Button>
            </form>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-5">
            <Card className="p-6 border-border bg-card sticky top-24">
              <h2 className="text-lg font-bold text-foreground mb-4">Resumen de Compra</h2>

              {/* Items List */}
              <div className="max-h-[240px] overflow-y-auto divide-y divide-border pr-2 mb-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3 py-3 items-center">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-12 w-12 rounded-lg bg-secondary object-contain p-1 border border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-card-foreground truncate">
                        {item.product.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Cant: {item.quantity} · {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-card-foreground">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Sum */}
              <div className="border-t border-border pt-4 space-y-2 text-sm text-card-foreground">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <TruckIcon className="h-4 w-4" /> Envíos:
                  </span>
                  <span className="font-medium text-foreground">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">Gratis</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <p className="text-[10px] text-muted-foreground text-right italic">
                    ¡Envío gratis para compras superiores a {formatPrice(150)}!
                  </p>
                )}
                <div className="flex justify-between border-t border-border pt-3 text-base">
                  <span className="font-bold text-foreground">Total:</span>
                  <span className="font-bold text-primary text-lg">{formatPrice(orderTotal)}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-4 flex items-center gap-2.5 text-xs text-muted-foreground">
                <ShieldIcon className="h-4 w-4 text-emerald-600" />
                <p>Compra 100% segura. Tus datos están completamente encriptados.</p>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </PageWraper>
  );
};

export default CheckoutPage;

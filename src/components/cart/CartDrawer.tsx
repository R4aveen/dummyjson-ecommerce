import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { XIcon, PlusIcon, MinusIcon, TrashIcon, ShoppingBagIcon } from "@/components/ui/Icons";
import { formatPrice } from "@/utils/format";
import { Button, Card } from "@/components/ui";

export const CartDrawer = () => {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isCartOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isCartOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div
        className={`absolute inset-y-0 right-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out sm:rounded-l-3xl ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBagIcon className="h-5 w-5 text-accent" />
            Tu Carrito
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(false)}
            className="rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Cerrar carrito"
          >
            <XIcon className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="rounded-full bg-slate-50 p-6 text-slate-400">
                <ShoppingBagIcon className="h-12 w-12" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-700">Tu carrito está vacío</h3>
              <p className="mt-2 text-sm text-slate-400 max-w-240px">
                Explora nuestra tienda y añade productos para verlos aquí.
              </p>
              <Button
                variant="primary"
                onClick={() => setIsCartOpen(false)}
                className="mt-6 rounded-full px-6 py-2.5 text-sm font-semibold shadow-md hover:scale-105 transition-transform"
              >
                Seguir comprando
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card
                  key={item.product.id}
                  className="flex flex-row gap-4 p-4 border-slate-100 shadow-none hover:shadow-xs transition-shadow rounded-2xl bg-white"
                >
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="h-20 w-20 rounded-xl bg-slate-50 object-contain p-1 border border-slate-100"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h4 className="line-clamp-1 text-sm font-semibold text-slate-800">
                        {item.product.title}
                      </h4>
                      <p className="text-xs text-slate-400 capitalize">{item.product.category}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">
                        {formatPrice(item.product.price)}
                      </span>
                      <div className="flex items-center gap-1.5 rounded-full bg-slate-50 p-1 border border-slate-200/60">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="h-6 w-6 rounded-full p-0 text-slate-500 hover:bg-slate-200"
                          aria-label="Disminuir cantidad"
                        >
                          <MinusIcon className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-xs font-semibold text-slate-700">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-6 w-6 rounded-full p-0 text-slate-500 hover:bg-slate-200"
                          aria-label="Aumentar cantidad"
                        >
                          <PlusIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.product.id)}
                    className="self-start rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500 h-8 w-8 p-0"
                    aria-label="Eliminar producto"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-slate-100 px-6 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 font-medium">Subtotal</span>
              <span className="text-xl font-bold text-slate-900">{formatPrice(cartTotal)}</span>
            </div>
            <p className="text-xs text-slate-400">
              Gastos de envío e impuestos calculados en el checkout.
            </p>
            <div className="flex flex-col gap-2">
              <Button
                variant="primary"
                className="w-full rounded-xl py-3 text-sm font-semibold shadow-md shadow-accent/20 hover:scale-[1.01] transition-transform"
                onClick={() => alert("¡Funcionalidad de Checkout en desarrollo!")}
              >
                Proceder al pago
              </Button>
              <Button
                variant="ghost"
                onClick={clearCart}
                className="w-full rounded-xl py-2 text-xs font-medium text-slate-400 hover:text-red-500 hover:bg-red-50/50"
              >
                Vaciar carrito
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

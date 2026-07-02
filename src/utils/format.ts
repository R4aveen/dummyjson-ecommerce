const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(value: number): string {
  return currencyFormatter.format(value);
}

export function getOriginalPrice(price: number, discountPercentage: number): number {
  return price / (1 - discountPercentage / 100);
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

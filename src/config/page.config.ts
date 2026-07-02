export interface PageConfig {
  id: string;
  to: string;
  text: string;
}

export const pagesConfig = {
  homePage: {
    id: "homePage",
    to: "/",
    text: "Inicio",
  },
  shopPage: {
    id: "shopPage",
    to: "/shop",
    text: "Tienda",
  },
  productPage: {
    id: "productPage",
    to: "/shop/:productId",
    text: "Producto",
  },
  checkoutPage: {
    id: "checkoutPage",
    to: "/checkout",
    text: "Pagar",
  },
} satisfies Record<string, PageConfig>;

export function getProductPath(productId: number | string): string {
  return pagesConfig.productPage.to.replace(":productId", String(productId));
}

export default pagesConfig;

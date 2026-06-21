import { lazy } from "react";
import type { PathRouteProps } from "react-router-dom";
import pagesConfig from "@/config/page.config";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const ShopPage = lazy(() => import("@/pages/shop/ShopPage"));

const cfp = pagesConfig as any;

export const contentRoutes: PathRouteProps[] = [
    { path: "/", element: <HomePage /> },
    { path: cfp.shopPage.to, element: <ShopPage /> }
]

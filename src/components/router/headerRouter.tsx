import { Route, Routes } from "react-router-dom";
import { headerRoutes } from "@/routes/headerRoutes";

export const HeaderRouter = () => {
  return (
    <Routes>
      {headerRoutes.map((routeProps) => (
        <Route key={routeProps.path} {...routeProps} />
      ))}
    </Routes>
  );
};

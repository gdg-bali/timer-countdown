import { Route, Routes } from "react-router-dom";
import { routerType } from "../configs/route";
import SidebarLayout from "@/Layout/sidebar-layout";
import Countdown from "@/Pages/countdown";
import NotFound from "@/Pages/notfound";
import Time from "@/Pages/time";

const RouterData: routerType[] = [
  {
    path: "",
    title: "",
    element: <SidebarLayout />,
    items: [
      {
        path: "",
        element: <Countdown />,
        title: "home",
      },
      {
        path: "/time",
        element: <Time />,
        title: "home",
      },
    ],
  },
];

// We're mapping over the RouterData.tsx file and for each object in our data, we are returning a route.
const Router = () => {
  const renderRoutes = (routes: routerType[]) =>
    routes.map(({ path, element, items }) => (
      <Route key={path} path={path} element={element}>
        {items && renderRoutes(items)}
      </Route>
    ));

  return (
    <Routes>
      {renderRoutes(RouterData)}
      <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
    </Routes>
  );
};

export default Router;

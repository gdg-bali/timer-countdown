import { createBrowserRouter } from "react-router-dom";

import SidebarLayout from "@/Layout/sidebar-layout";
import Countdown from "@/Pages/countdown";
import Time from "@/Pages/time";
import NotFound from "@/Pages/notfound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      {
        path: "/",
        element: <Countdown />,
      },
      {
        path: "/time",
        element: <Time />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

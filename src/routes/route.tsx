import { createBrowserRouter } from "react-router-dom";

import Countdown from "@/Pages/countdown";
import NotFound from "@/Pages/notfound";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Countdown />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

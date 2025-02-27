import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/route";

const App = () => {
  return <RouterProvider router={Router} />;
};

export default App;

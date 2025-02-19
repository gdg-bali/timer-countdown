import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/route";

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;

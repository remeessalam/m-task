import ReactDOM from "react-dom/client";
import appRouter from "./App";
import { RouterProvider } from "react-router-dom";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

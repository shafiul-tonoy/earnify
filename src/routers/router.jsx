import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import ErrorPage from "../pages/ErrorPase";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    errorElement: <ErrorPage />,
    children: [],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import ErrorPage from "../pages/ErrorPase";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../pages/dashboard/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    errorElement: <ErrorPage />,
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { 
        index:true,
        element: <DashboardHome /> 
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import ErrorPage from "../pages/ErrorPase";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import BuyerRoute from "./BuyerRoute";
import DashboardHome from "../pages/dashboard/DashboardHome";
import AddNewTasks from "../pages/dashboard/buyer/AddNewTasks";
import MyTasks from "../pages/dashboard/buyer/MyTasks";
import PurchaseCoin from "../pages/dashboard/buyer/PurchaseCoin";

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
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "/dashboard/addNewTasks",
        element: (
          <BuyerRoute>
            <AddNewTasks />
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/myTasks",
        element: (
          <BuyerRoute>
            <MyTasks />
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/purchaseCoin",
        element: (
          <BuyerRoute>
            <PurchaseCoin />
          </BuyerRoute>
        ),
      },
    ],
  },
]);

export default router;

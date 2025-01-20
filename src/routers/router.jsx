import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import ErrorPage from "../pages/ErrorPase";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import BuyerRoute from "./BuyerRoute";
import AdminRoute from "./AdminRoute";
import WorkerRoute from "./WorkerRoute";
import DashboardHome from "../pages/dashboard/DashboardHome";
import AddNewTasks from "../pages/dashboard/buyer/AddNewTasks";
import MyTasks from "../pages/dashboard/buyer/MyTasks";
import PurchaseCoin from "../pages/dashboard/buyer/PurchaseCoin";
import ManageTasks from "../pages/dashboard/admin/ManageTasks";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import TaskList from "../pages/dashboard/worker/TaskList";
import MySubmissions from "../pages/dashboard/worker/MySubmissions";
import Withdrawals from "../pages/dashboard/worker/Withdrawals";
import PaymentHistory from "../pages/dashboard/buyer/PaymentHistory";

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
      {
        path: "/dashboard/paymentHistory",
        element: (
          <BuyerRoute>
            <PaymentHistory />
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/manageTasks",
        element: (
          <AdminRoute>
            <ManageTasks />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/taskList",
        element: (
          <WorkerRoute>
            <TaskList />
          </WorkerRoute>
        ),
      },
      {
        path: "/dashboard/mySubmissions",
        element: (
          <WorkerRoute>
            <MySubmissions />
          </WorkerRoute>
        ),
      },
      {
        path: "/dashboard/withdrawals",
        element: (
          <WorkerRoute>
            <Withdrawals />
          </WorkerRoute>
        ),
      },
    ],
  },
]);

export default router;

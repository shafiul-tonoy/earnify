import useUserInfo from "../../hooks/useUserInfo";
import Loading from "../../components/Loading";
import WorkerHome from "./worker/WorkerHome";
import BuyerHome from "./buyer/BuyerHome";
import AdminHome from "./admin/AdminHome";

export default function DashboardHome() {
  const { data: userInfo, isLoading, error } = useUserInfo();
  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!userInfo) return <div>No user found</div>;

  return (
    <>
      {userInfo.role === "worker" && <WorkerHome />}
      {userInfo.role === "buyer" && <BuyerHome />}
      {userInfo.role === "admin" && <AdminHome />}
    </>
  );
}

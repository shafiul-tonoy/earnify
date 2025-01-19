import WorkerNav from "./WorkerNav";
import BuyerNav from "./BuyerNav";
import AdminNav from "./AdminNav";
import useUserInfo from "../../../hooks/useUserInfo";
import Loading from "../../../components/Loading";

export default function MainSideNav() {
  const { data: userInfo, isLoading, error } = useUserInfo();
  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!userInfo) return <div>No user found</div>;

  return (
    <>
      {userInfo.role === "worker" && <WorkerNav />}
      {userInfo.role === "buyer" && <BuyerNav />}
      {userInfo.role === "admin" && <AdminNav />}
    </>
  );
}

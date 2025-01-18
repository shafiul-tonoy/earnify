import SiteName from "../SiteName";
import { Link } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo";
import Loading from "../Loading";
import CustomTitle from "../CustomTitle";

export default function DashboardNav() {
  const { data: userInfo, isLoading, error } = useUserInfo();
  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!userInfo) return <div>No user found</div>;

  return (
    <>
      <CustomTitle title="Dashboard"/>  
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl">
            <SiteName />
          </Link>
        </div>

        <div className="navbar-end space-x-2">
          <div>
            <div className="flex gap-2">
              Coin {userInfo.coin}
              <img src={userInfo.image} alt="" className="w-10 h-10" />
            </div>
            <div>
              <p>Name: {userInfo.name}</p>
              <p>Role: {userInfo.role}</p>
            </div>
          </div>
          <div>
            <a className="btn">Notification</a>
          </div>
        </div>
      </div>
    </>
  );
}

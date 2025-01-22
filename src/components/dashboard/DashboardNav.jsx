import SiteName from "../SiteName";
import { Link } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo";
import Loading from "../Loading";
import CustomTitle from "../CustomTitle";
import { FaRegBell } from "react-icons/fa";
import useNotification from "../../hooks/useNotification";

export default function DashboardNav() {
  const { data: userInfo, isLoading: userLoading, error: userError } = useUserInfo();
  const { notifications, isLoading: notifLoading } = useNotification();

  if (userLoading) return <Loading />;
  if (userError) return <div>Error: {userError.message}</div>;
  if (!userInfo) return <div>No user found</div>;

  return (
    <>
      <CustomTitle title="Dashboard" />
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
            <button
              className="btn btn-ghost"
              onClick={() => document.getElementById("notification_modal").showModal()}
            >
              <FaRegBell size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Notifications */}
      <dialog id="notification_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Notifications</h3>
          {notifLoading ? (
            <p>Loading notifications...</p>
          ) : notifications.length ? (
            <ul className="space-y-2">
              {notifications.map((notif) => (
                <li key={notif._id} className="border p-2 rounded shadow">
                  <p>{notif.message}</p>
                  <small className="text-gray-500">
                    {new Date(notif.time).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications found.</p>
          )}
          <form method="dialog" className="mt-4">
            <button className="btn btn-sm">Close</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

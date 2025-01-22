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
      <div className="navbar bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white p-4 ">
        <div className="navbar-start">
          <Link to="/" className="text-xl font-bold">
            <SiteName />
          </Link>
        </div>

        <div className="navbar-end flex items-center space-x-4">
          <div className="flex items-center gap-3">
            <div className="text-sm">
              <p className="font-bold text-white">Coins: {userInfo.coin}</p>
              <p className="text-gray-200">
                Role: <span className="capitalize">{userInfo.role}</span>
              </p>
            </div>
            <img
              src={userInfo.image}
              alt="User Avatar"
              className="w-10 h-10 rounded-full ring-2 ring-white object-cover object-top"
            />
          </div>
          <button
            className="relative btn btn-ghost text-white hover:bg-purple-600 transition duration-300"
            onClick={() => document.getElementById("notification_modal").showModal()}
          >
            <FaRegBell size={24} />
            {notifications?.length > 0 && (
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            )}
          </button>
        </div>
      </div>

      {/* Modal for Notifications */}
      <dialog id="notification_modal" className="modal">
        <div className="modal-box bg-white rounded-lg shadow-lg">
          <h3 className="font-bold text-lg text-gray-800">Notifications</h3>
          {notifLoading ? (
            <p className="text-gray-500">Loading notifications...</p>
          ) : notifications.length ? (
            <ul className="mt-4 space-y-2">
              {notifications.map((notif) => (
                <li key={notif._id} className="border p-3 rounded-lg shadow-sm hover:bg-gray-50">
                  <p className="text-gray-700">{notif.message}</p>
                  <small className="text-gray-400">
                    {new Date(notif.time).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No notifications found.</p>
          )}
          <form method="dialog" className="mt-4">
            <button className="btn btn-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500 shadow-md">
              Close
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="btn btn-sm">Close</button>
        </form>
      </dialog>
    </>
  );
}

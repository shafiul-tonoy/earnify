import { Link } from "react-router-dom";
import { GoTasklist } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { TiHomeOutline } from "react-icons/ti";

export default function AdminNav() {
  return (
    <>
      <ul className="menu bg-base-200 rounded-box w-56">
        <li>
          <div className="flex gap-2">
            <TiHomeOutline size="22" />
            <Link to="/">Home</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-2">
            <FiUsers size="22" />
            <Link to="/dashboard/manageUsers">Manage Users</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-2">
            <GoTasklist size="22" />
            <Link to="/dashboard/manageTasks">Manage Tasks</Link>
          </div>
        </li>
      </ul>
    </>
  );
}

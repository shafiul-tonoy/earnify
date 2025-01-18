import { Link } from "react-router-dom";
import { GoTasklist } from "react-icons/go";
import { FiUsers } from "react-icons/fi";

export default function AdminNav() {
  return (
    <>
      <ul className="menu bg-base-200 rounded-box w-56">
        <li>
          <div className="flex gap-2">
            <FiUsers size="22" />
            <Link to="/">Manage Task</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-2">
            <GoTasklist size="22" />
            <Link to="/">Manage Tasks</Link>
          </div>
        </li>
      </ul>
    </>
  );
}

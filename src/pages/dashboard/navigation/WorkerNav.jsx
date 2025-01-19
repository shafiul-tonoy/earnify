import { Link } from "react-router-dom";
import { GoTasklist } from "react-icons/go";
import { MdOutlineSendTimeExtension } from "react-icons/md";
import { PiHandWithdrawBold } from "react-icons/pi";
import { TiHomeOutline } from "react-icons/ti";

export default function WorkerNav() {
  return (
    <>
      <ul className="menu bg-base-200 rounded-box w-56">
        <li>
          <div className="flex gap-2">
            <TiHomeOutline size="22" />
            <Link to="/dashboard">Home</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-2">
            <GoTasklist size="22" />
            <Link to="/dashboard/taskList">Task List</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-2">
            <MdOutlineSendTimeExtension size="22" />
            <Link to="/dashboard/mySubmissions">My Submissions</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-2">
            <PiHandWithdrawBold size="22" />
            <Link to="/dashboard/withdrawals">Withdrawals</Link>
          </div>
        </li>
      </ul>
    </>
  );
}

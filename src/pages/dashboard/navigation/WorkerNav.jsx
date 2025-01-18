import { Link } from "react-router-dom";
import { GoTasklist } from "react-icons/go";
import { MdOutlineSendTimeExtension } from "react-icons/md";
import { PiHandWithdrawBold } from "react-icons/pi";

export default function WorkerNav() {
  return (
    <>
      <ul className="menu bg-base-200 rounded-box w-56">
        <li>
          <div className="flex gap-2">
            <GoTasklist size="22" />
            <Link to="/">Task List</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-2">
            <MdOutlineSendTimeExtension size="22" />
            <Link to="/">My Submissions</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-2">
            <PiHandWithdrawBold size="22" />
            <Link to="/">Withdrawals</Link>
          </div>
        </li>
      </ul>
    </>
  );
}

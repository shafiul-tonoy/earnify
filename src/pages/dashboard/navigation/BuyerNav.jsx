import { Link } from "react-router-dom";
import { GoTasklist } from "react-icons/go";
import { MdAddTask } from "react-icons/md";
import { CiBadgeDollar } from "react-icons/ci";
import { TiHomeOutline } from "react-icons/ti";

export default function BuyerNav() {
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
            <MdAddTask size="22" />
            <Link to="/dashboard/addNewTasks">Add new Tasks</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-2">
            <GoTasklist size="22" />
            <Link to="/dashboard/myTasks">My Tasks</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-2">
            <CiBadgeDollar size="22" />
            <Link to="/dashboard/purchaseCoin">Purchase Coin</Link>
          </div>
        </li>
      </ul>
    </>
  );
}

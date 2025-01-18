import { Link } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import WorkerNav from "./WorkerNav";
import BuyerNav from "./BuyerNav";
import AdminNav from "./AdminNav";

export default function MainSideNav() {
  return (
    <>
      <ul className="menu bg-base-200 rounded-box w-56 my-3">
        <li>
          <div className="flex gap-2">
            <TiHomeOutline size="22" />
            <Link to="/">Home</Link>
          </div>
        </li>
      </ul>
      <WorkerNav />
      <BuyerNav />
      <AdminNav />
    </>
  );
}

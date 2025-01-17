import SiteName from "../components/SiteName";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navOptions = (
    <>
      {user && user?.email && (
        <li>
          <NavLink to="/">Add Service</NavLink>
        </li>
      )}
    </>
  );

  console.log(user);
  

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <SiteName />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex flex-col gap-2 md:flex-row items-center justify-center">
          {user && user?.email ? (
            <div className="flex items-center gap-1">
              <div
                className="tooltip  tooltip-left"
                data-tip={user.displayName}
              >
                <img
                  src={user.photoURL}
                  alt="image"
                  className="w-10 h-10 rounded-full object-cover object-top"
                ></img>
              </div>

              <button
                className="btn btn-ghost text-linksColor"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline text-gray-600">
                Login
              </Link>
              <Link to="/register" className="btn bg-blue-500 text-white">
                Register
              </Link>
            </>
          )}

          <a
            className="btn font-content btn-info  text-white"
            href="https://github.com/shafiul-tonoy"
            target="_blank"
          >
            Join As Developer
          </a>
        </div>
      </div>
    </div>
  );
}

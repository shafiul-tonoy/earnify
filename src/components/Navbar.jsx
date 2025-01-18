import SiteName from "../components/SiteName";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navOptions = (
    <>
      {user && user?.email && (
        <>
          <li className="font-subheading  btn  bg-blue-600 text-white hover:bg-blue-700">
            <div>
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 items-center">
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

        <Link to="/" className="btn btn-ghost text-xl">
          <SiteName />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex flex-col gap-2 lg:gap-4 md:flex-row items-center justify-center">
          {user && user.email && (
            <div className="bg-white shadow-md rounded-lg p-2 max-w-sm mx-auto text-center">
              <h2 className="text-gray-500 text-sm uppercase font-semibold mb-2">
                Available Balance
              </h2>
              <p className="text-sm font-bold text-blue-600">$1,234.56</p>
            </div>
          )}

          {user && user?.email ? (
            <div className="flex items-center gap-1">
              <div
                className="tooltip  tooltip-left"
                data-tip={user.displayName}
              >
                <div className="avatar">
                  <div className="ring-blue-500 ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
                    <img
                      src={user.photoURL}
                      alt="image"
                      className="w-10 h-10 rounded-full object-cover object-top"
                    ></img>
                  </div>
                </div>
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

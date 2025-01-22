import SiteName from "../components/SiteName";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LiaCoinsSolid } from "react-icons/lia";
import useUserInfo from "../hooks/useUserInfo";
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaGithub, FaSignInAlt, FaUserPlus } from "react-icons/fa";

export default function NavBar() {
  const { data: userInfo } = useUserInfo();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar bg-base-100 px-4 shadow-md">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            aria-label="Open Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-lg"
          >
            {user && user.email && (
              <li>
                <Link to="/dashboard" className="font-semibold">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="text-xl font-bold btn btn-ghost">
          <SiteName />
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-2">
          {user && user.email && (
            <li>
              <Link
                to="/dashboard"
                className="font-semibold btn bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out gap-2"
              >
                <MdDashboard size={20} />
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex flex-wrap items-center space-x-4 sm:space-x-2">
        {/* Coins Section */}
        {user && user.email && userInfo?.coin && (
          <div className="flex items-center gap-2 mr-2">
            <LiaCoinsSolid size={24} className="text-gray-500" />
            <p className="text-blue-600 font-bold">{userInfo.coin}</p>
          </div>
        )}

        {/* User Avatar & Logout */}
        {user && user.email ? (
          <div className="flex items-center space-x-2 sm:space-x-1">
            <div
              className="tooltip tooltip-left"
              data-tip={user.displayName || "User"}
            >
              <div className="avatar">
                <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full ring ring-blue-500 ring-offset-2 mr-3">
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md transform hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              <FiLogOut size={20} />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2 sm:space-x-1">
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-md shadow-md hover:text-white hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-700 transition duration-300 ease-in-out"
            >
              <FaSignInAlt size={18} />
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-md shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <FaUserPlus size={18} />
              Register
            </Link>
          </div>
        )}

        {/* Join as Developer */}
        <a
          href="https://github.com/shafiul-tonoy"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-black shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          <FaGithub size={20} />
          Join as Developer
        </a>
      </div>
    </nav>
  );
}

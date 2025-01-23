import { useState } from 'react';
import { Link } from "react-router-dom";
import { 
  Menu, 
  X, 
  Home, 
  LogIn, 
  UserPlus, 
  User, 
  LogOut, 
  DollarSign,
  GitMerge 
} from 'lucide-react';
import SiteName from "../components/SiteName";
import useAuth from "../hooks/useAuth";
import useUserInfo from "../hooks/useUserInfo";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: userInfo } = useUserInfo();
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLinks = () => (
    <>
      {user && user.email && (
        <Link 
          to="/dashboard" 
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <User className="w-5 h-5" />
          Dashboard
        </Link>
      )}
    </>
  );

  const AuthButtons = () => (
    <div className="flex items-center space-x-4">
      {user && user.email ? (
        <div className="flex items-center space-x-4">
          {/* Coins Display */}
          {userInfo?.coin && (
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <DollarSign className="w-4 h-4 mr-1 text-yellow-600" />
              <span className="font-semibold text-gray-800">
                {userInfo.coin}
              </span>
            </div>
          )}

          {/* User Avatar and Logout */}
          <div className="flex items-center space-x-2">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                <img 
                  src={user.photoURL} 
                  alt="User avatar" 
                  className="object-cover"
                />
              </div>
            </div>
            
            <button 
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link 
            to="/login"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <LogIn className="w-5 h-5" />
            Login
          </Link>
          <Link 
            to="/register"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            Register
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
            >
              <SiteName />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
            <div className="mx-4 h-6 w-px bg-gray-300" />
            <AuthButtons />
            <a
              href="https://github.com/shafiul-tonoy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <GitMerge className="w-5 h-5" />
              Join Dev
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLinks />
              <div className="border-t my-2" />
              <AuthButtons />
              <a
                href="https://github.com/shafiul-tonoy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors w-full text-center justify-center"
              >
                <GitMerge className="w-5 h-5" />
                Join Dev
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
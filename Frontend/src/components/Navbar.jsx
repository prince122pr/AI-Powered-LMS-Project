import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/EdGine_Logos/logo-png.png";
import { IoPersonCircleOutline, IoLogOutOutline, IoMenu } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { backendBaseURL } from "../App";
import { setUserData } from "../store/slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user || {});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(`${backendBaseURL}/auth/logout`, { withCredentials: true });
      dispatch(setUserData(null));
      toast.success("Logout Successfully!", { position: "bottom-right" });
      navigate("/login");
    } catch (error) {
      toast.error("Error in Logout!", error);
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-30 bg-gradient-to-r from-black via-gray-900 to-gray-800 backdrop-blur-md shadow-lg font-[f2]">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 md:px-12">
        {/* Logo */}
        <img
          src={logo}
          alt="EdGine Logo"
          className="w-[120px] h-10 rounded-md cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/")}
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 relative">
          {userData ? (
            <>
              {/* Profile */}
              <div
                className="flex items-center gap-2 cursor-pointer text-white font-medium hover:text-orange-400 transition-colors relative"
                onClick={() => setProfileOpen((prev) => !prev)}
              >
                <IoPersonCircleOutline className="text-2xl" />
                <span>{userData.name}</span>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute top-10 w-48 bg-white text-black shadow-lg rounded-md flex flex-col py-2">
                    <span
                      className="px-4 py-2 hover:bg-gray-900 hover:text-white cursor-pointer"
                      onClick={() => navigate("/profile")}
                    >
                      My Profile
                    </span>
                    <span
                      className="px-4 py-2 hover:bg-gray-900 hover:text-white cursor-pointer"
                      onClick={() => navigate("/my-courses")}
                    >
                      My Courses
                    </span>
                  </div>
                )}
              </div>

              {/* Dashboard for Educator */}
              {userData.role === "educator" && (
                <div
                  className="flex items-center gap-2 cursor-pointer text-white font-medium hover:text-orange-400 transition-colors"
                  onClick={() => navigate("/dashboard")}
                >
                  <MdSpaceDashboard className="text-2xl" />
                  <span className="text-lg">Dashboard</span>
                </div>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-0.5 hover:scale-105"
              >
                <IoLogOutOutline className="inline mr-1 text-base" />
                Logout
              </button>
            </>
          ) : (
            <span
              className="px-4 py-1 border-2 border-white text-white rounded-xl text-base font-medium cursor-pointer bg-transparent hover:bg-gradient-to-r from-orange-500 to-orange-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <IoMenu />
        </button>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
{mobileMenuOpen && (
  <div className="md:hidden bg-black/80 backdrop-blur-md flex flex-col gap-2 px-4 py-3 shadow-lg">
    {userData ? (
      <>
        
        <span
          className="flex items-center gap-2 text-white py-2 px-3 rounded-md hover:bg-gray-700/60 hover:text-orange-400 transition-all"
          onClick={() => navigate("/profile")}
        >
          <IoPersonCircleOutline />
          {userData.name}
        </span>

          {userData.role === "educator" && (
            <span
          className="cursor-pointer text-white py-2 px-3 rounded-md hover:bg-gray-700/60 hover:text-orange-400 transition-all"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </span>
          )
        }
        
        <span
          className="cursor-pointer text-white py-2 px-3 rounded-md hover:bg-gray-700/60 hover:text-orange-400 transition-all"
          onClick={() => navigate("/my-courses")}
        >
          My Courses
        </span>
        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded-md bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium shadow-sm hover:shadow-lg transition-all"
        >
          <IoLogOutOutline className="inline mr-1 text-base" />
          Logout
        </button>
      </>
    ) : (
      <span
        className="px-4 py-2 border-2 border-white text-white rounded-md text-base font-medium cursor-pointer bg-transparent hover:bg-gradient-to-r from-orange-500 to-orange-600 hover:text-white transition-all shadow-sm"
        onClick={() => navigate("/login")}
      >
        Login
      </span>
    )}
  </div>
)}

    </nav>
  );
};

export default Navbar;

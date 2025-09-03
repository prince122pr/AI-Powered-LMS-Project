import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/EdGine_Logos/logo-png.png";
import { IoPersonCircleOutline, IoLogOutOutline, IoMenu, IoClose, IoSchoolOutline } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
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
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Entrance animation
    setTimeout(() => {
      setNavVisible(true);
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  // Close mobile menu when navigating
  const handleNavigate = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav 
      className={` w-full fixed top-0 left-0 z-30 transition-all duration-500 font-[f2] ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-lg shadow-lg' 
          : 'bg-gradient-to-r from-black/90 via-gray-900/90 to-gray-800/90 backdrop-blur-md'
      } ${navVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
    >
      <div className="flex items-center justify-between px-4 lg:px-5 py-4 relative">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="EdGine Logo"
            className="w-[120px] h-10 rounded-md cursor-pointer hover:scale-110 transition-transform duration-300 "
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-3 absolute left-1/2 transform -translate-x-1/2">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-base font-medium transition-all duration-300 border-b-2 py-1 px-2 ${
                isActive 
                  ? 'text-orange-400 border-orange-400' 
                  : 'text-white border-transparent hover:text-orange-300 hover:border-orange-300'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/courses" 
            className={({ isActive }) => 
              `text-base font-medium transition-all duration-300 border-b-2 py-1 px-2 ${
                isActive 
                  ? 'text-orange-400 border-orange-400' 
                  : 'text-white border-transparent hover:text-orange-300 hover:border-orange-300'
              }`
            }
          >
            Courses
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `text-base font-medium transition-all duration-300 border-b-2 py-1 px-2 ${
                isActive 
                  ? 'text-orange-400 border-orange-400' 
                  : 'text-white border-transparent hover:text-orange-300 hover:border-orange-300'
              }`
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `text-base font-medium transition-all duration-300 border-b-2 py-1 px-2 ${
                isActive 
                  ? 'text-orange-400 border-orange-400' 
                  : 'text-white border-transparent hover:text-orange-300 hover:border-orange-300'
              }`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Desktop User Menu */}
        <div className="hidden sm:flex items-center gap-6 relative">
          {userData ? (
            <>
              {/* Profile */}
              <div
                className="flex items-center gap-2 cursor-pointer text-white font-medium hover:text-orange-400 transition-colors relative group"
                onClick={() => setProfileOpen((prev) => !prev)}
              >
                <div className="flex items-center gap-2 relative z-10">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center overflow-hidden">
                    <IoPersonCircleOutline className="text-2xl text-white" />
                  </div>
                  <span className="group-hover:text-orange-400 transition-colors">{userData.name.slice(0,8)}</span>
                </div>

                {/* Dropdown */}
                <div 
                  className={`absolute top-full right-0 w-56 mt-2 bg-white/10 backdrop-blur-lg text-white rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 origin-top-right border border-gray-700 ${
                    profileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="p-2 space-y-1">
                    <div 
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/10 cursor-pointer transition-all"
                      onClick={() => handleNavigate("/profile")}
                    >
                      <IoPersonCircleOutline className="text-xl text-orange-400" />
                      <span>My Profile</span>
                    </div>
                    <div 
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/10 cursor-pointer transition-all"
                      onClick={() => handleNavigate("/my-courses")}
                    >
                      <IoSchoolOutline className="text-xl text-orange-400" />
                      <span>My Courses</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard for Educator */}
              {userData.role === "educator" && (
                <div
                  className="flex items-center gap-2 cursor-pointer text-white font-medium hover:text-orange-400 transition-colors"
                  onClick={() => handleNavigate("/dashboard")}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                    <MdSpaceDashboard className="text-xl text-white" />
                  </div>
                  <span className="text-base">Dashboard</span>
                </div>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium shadow-md hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 hover:scale-105 duration-300"
              >
                <IoLogOutOutline className="inline mr-1.5 text-base" />
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span
                className="px-5 py-2 border-2 border-orange-500 text-white rounded-xl text-base font-medium cursor-pointer bg-transparent hover:bg-gradient-to-r from-orange-500 to-orange-600 hover:border-transparent transition-all duration-300 shadow-md hover:shadow-orange-500/30 transform hover:-translate-y-1 hover:scale-105"
                onClick={() => handleNavigate("/login")}
              >
                Login
              </span>
              <span
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium cursor-pointer shadow-md hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                onClick={() => handleNavigate("/register")}
              >
                Register
              </span>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white text-2xl focus:outline-none p-2 rounded-full hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
<div 
  className={`lg:hidden bg-black/90 backdrop-blur-lg flex flex-col gap-2 px-4 shadow-xl transition-all duration-300 overflow-hidden ${
    mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
  }`}
>
  {/* Navigation Links */}
  <div className="border-b border-gray-800 pb-3 mb-2">
    <NavLink 
      to="/" 
      className={({ isActive }) => 
        `flex items-center gap-2 text-white py-2.5 px-3 rounded-lg transition-all ${
          isActive ? 'bg-white/10 text-orange-400' : 'hover:bg-white/5 hover:text-orange-300'
        }`
      }
      onClick={() => setMobileMenuOpen(false)}
    >
      Home
    </NavLink>
    <NavLink 
      to="/courses" 
      className={({ isActive }) => 
        `flex items-center gap-2 text-white py-2.5 px-3 rounded-lg transition-all ${
          isActive ? 'bg-white/10 text-orange-400' : 'hover:bg-white/5 hover:text-orange-300'
        }`
      }
      onClick={() => setMobileMenuOpen(false)}
    >
      Courses
    </NavLink>
    <NavLink 
      to="/about" 
      className={({ isActive }) => 
        `flex items-center gap-2 text-white py-2.5 px-3 rounded-lg transition-all ${
          isActive ? 'bg-white/10 text-orange-400' : 'hover:bg-white/5 hover:text-orange-300'
        }`
      }
      onClick={() => setMobileMenuOpen(false)}
    >
      About
    </NavLink>
    <NavLink 
      to="/contact" 
      className={({ isActive }) => 
        `flex items-center gap-2 text-white py-2.5 px-3 rounded-lg transition-all ${
          isActive ? 'bg-white/10 text-orange-400' : 'hover:bg-white/5 hover:text-orange-300'
        }`
      }
      onClick={() => setMobileMenuOpen(false)}
    >
      Contact
    </NavLink>
  </div>

  {/* User Menu */}
  {userData ? (
    <div className="space-y-2">
      <div
        className="flex items-center gap-3 text-white py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 hover:text-orange-400 transition-all"
        onClick={() => handleNavigate("/profile")}
      >
        <IoPersonCircleOutline className="text-xl text-orange-400" />
        <span>{userData.name}</span>
      </div>

      <div
        className="flex items-center gap-3 text-white py-2.5 px-3 rounded-lg hover:bg-white/10 hover:text-orange-400 transition-all"
        onClick={() => handleNavigate("/my-courses")}
      >
        <IoSchoolOutline className="text-xl text-orange-400" />
        <span>My Courses</span>
      </div>

      {userData.role === "educator" && (
        <div
          className="flex items-center gap-3 text-white py-2.5 px-3 rounded-lg hover:bg-white/10 hover:text-orange-400 transition-all"
          onClick={() => handleNavigate("/dashboard")}
        >
          <MdSpaceDashboard className="text-xl text-orange-400" />
          <span>Dashboard</span>
        </div>
      )}
      
      <button
        onClick={handleLogout}
        className="w-full mt-3 px-3 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium shadow-md hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
      >
        <IoLogOutOutline className="text-xl" />
        Logout
      </button>
    </div>
  ) : (
    <div className="space-y-3 pt-2">
      <button
        className="w-full px-4 py-2.5 border-2 border-orange-500 text-white rounded-lg text-base font-medium cursor-pointer bg-transparent hover:bg-gradient-to-r from-orange-500 to-orange-600 hover:border-transparent transition-all shadow-md"
        onClick={() => handleNavigate("/login")}
      >
        Login
      </button>
      <button
        className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium cursor-pointer shadow-md transition-all"
        onClick={() => handleNavigate("/register")}
      >
        Register
      </button>
    </div>
  )}
</div>

    </nav>
  );
};

export default Navbar;

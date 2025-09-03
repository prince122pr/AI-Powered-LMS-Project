import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoEyeOffOutline, IoEyeOutline, IoLockClosedOutline, IoMailOutline } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";

import logo from "../assets/EdGine_Logos/logo-png.png";
import google from "../assets/EdGine_Logos/Google-logo.png";
import { backendBaseURL } from "../App";
import { setUserData } from "../store/slices/userSlice";
import { auth, provider } from "../utils/firebase";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after component mounts
    setFormVisible(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios.post(backendBaseURL + "/auth/login", form, { withCredentials: true });
      dispatch(setUserData(res.data));
      setLoading(false);
      toast.success('Login Successfully!', {
        position: "bottom-right"
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login Failed. Please check your credentials.");
    }
  };

  const googleLoginUp = async () => {
    try {
      let response = await signInWithPopup(auth, provider);
      let user = response.user;
      
      let gName = user.displayName;
      let gEmail = user.email;
      
      let result = await axios.post(backendBaseURL + "/auth/google-auth", {
        name: gName,
        email: gEmail,
        role: ""
      }, { withCredentials: true });

      dispatch(setUserData(result.data));
      toast.success('Login Successfully!', {
        position: "bottom-right"
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Google login failed");
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8 font-[f3]">
      <div 
        className={`w-full max-w-5xl transition-all duration-700 transform ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <form
          className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-[f2] font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to continue your learning journey</p>
            </div>

            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoMailOutline className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                    placeholder="Enter your email"
                    required
                    autoFocus
                    autoComplete="username"
                    tabIndex={0}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoLockClosedOutline className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                    placeholder="Enter your password"
                    required
                    minLength={6}
                    autoComplete="current-password"
                    tabIndex={0}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500 hover:text-orange-500 transition-colors"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/forget-password')}
                  className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors hover:underline"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-[f2] font-semibold rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none text-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <ClipLoader size={24} color="white" />
                    <span className="ml-2">Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or continue with</span>
                </div>
              </div>

              {/* Google Login */}
              <button
                type="button"
                onClick={googleLoginUp}
                className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 rounded-xl py-3 px-4 bg-white hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 text-gray-700 font-medium"
              >
                <img className="w-6 h-6" src={google} alt="Google" />
                <span>Sign in with Google</span>
              </button>

              {/* Register Link */}
              <div className="text-center mt-6 text-gray-600">
                Don't have an account?{" "}
                <NavLink
                  to="/register"
                  className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
                >
                  Sign up
                </NavLink>
              </div>
            </div>
          </div>

          {/* Right Side - Branding */}
          <div className="hidden md:block w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-orange-500"></div>
              <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-red-500"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-yellow-500 opacity-20"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-white">
              <img 
                src={logo} 
                alt="EdGine Logo" 
                className="w-64 mb-8 animate-pulse" 
              />
              <h2 className="text-3xl font-[f2] font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-300">
                Welcome Back to EdGine
              </h2>
              <p className="text-gray-300 text-center max-w-md">
                Continue your learning journey with access to all your courses, progress tracking, and personalized recommendations.
              </p>
              
              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 gap-6 w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <h3 className="text-3xl font-bold text-white mb-1">200+</h3>
                  <p className="text-sm text-gray-300">Courses Available</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <h3 className="text-3xl font-bold text-white mb-1">10K+</h3>
                  <p className="text-sm text-gray-300">Active Students</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <h3 className="text-3xl font-bold text-white mb-1">50+</h3>
                  <p className="text-sm text-gray-300">Expert Instructors</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <h3 className="text-3xl font-bold text-white mb-1">95%</h3>
                  <p className="text-sm text-gray-300">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
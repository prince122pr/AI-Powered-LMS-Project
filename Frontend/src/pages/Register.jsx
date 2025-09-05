import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";

import logo from "../assets/EdGine_Logos/logo-png.png";
import google from "../assets/EdGine_Logos/Google-logo.png";
import { backendBaseURL } from "../App.jsx";
import { setUserData } from "../store/slices/userSlice";
import { auth, provider } from "../utils/firebase.js";
import { currentUser } from "../store/actions/userActions.jsx";

const roles = ["student", "educator"];

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState("student");
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
      await axios.post(backendBaseURL + '/auth/register', {...form, role}, {
        withCredentials: true,
      });
      // console.log(res.data);
      
      dispatch(currentUser())


      setLoading(false);
      toast.success('Registered Successfully!', {
        position: "bottom-right"
      });
      navigate('/');
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Registration Failed!");
    }
  };

  const googleSignUp = async () => {
    try {
      let response = await signInWithPopup(auth, provider);
      let user = response.user;
      
      let gName = user.displayName;
      let gEmail = user.email;
      
      let result = await axios.post(backendBaseURL + "/auth/google-auth", {
        name: gName,
        email: gEmail,
        role
      }, { withCredentials: true });

      dispatch(setUserData(result.data));
      toast.success('Registered Successfully!', {
        position: "bottom-right"
      });
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Google sign-up failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8 font-[f3]">
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
            <div className="text-center mb-8">
              <h1 className="text-3xl font-[f2] font-bold text-gray-900 mb-2">Create Your Account</h1>
              <p className="text-gray-600">Join our community of learners and educators</p>
            </div>

            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 pr-12"
                    placeholder="Create a password"
                    required
                    minLength={6}
                    autoComplete="new-password"
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
                <p className="mt-1 text-sm text-gray-500">Password must be at least 6 characters</p>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  I am a:
                </label>
                <div className="flex gap-4">
                  {roles.map((rol) => (
                    <button
                      type="button"
                      key={rol}
                      className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium flex items-center justify-center gap-2 ${
                        rol === role
                          ? "border-orange-500 bg-orange-50 text-orange-600 shadow-md"
                          : "border-gray-300 bg-white text-gray-700 hover:border-orange-400 hover:bg-gray-50"
                      }`}
                      onClick={() => setRole(rol)}
                    >
                      {rol === "student" ? (
                        <FaUserGraduate className="text-lg" />
                      ) : (
                        <FaChalkboardTeacher className="text-lg" />
                      )}
                      <span className="capitalize">{rol}</span>
                    </button>
                  ))}
                </div>
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
                    <span className="ml-2">Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
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

              {/* Google Sign Up */}
              <button
                type="button"
                onClick={googleSignUp}
                className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 rounded-xl py-3 px-4 bg-white hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 text-gray-700 font-medium"
              >
                <img className="w-6 h-6" src={google} alt="Google" />
                <span>Sign up with Google</span>
              </button>

              {/* Login Link */}
              <div className="text-center mt-6 text-gray-600">
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
                >
                  Log in
                </NavLink>
              </div>
            </div>
          </div>

          {/* Right Side - Branding */}
          <div className="hidden md:block w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-orange-500"></div>
              <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-red-500"></div>
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
                Elevate Your Learning Journey
              </h2>
              <p className="text-gray-300 text-center max-w-md">
                Join thousands of students and educators on our platform. Access high-quality courses and transform your educational experience.
              </p>
              
              {/* Testimonial */}
              <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md">
                <p className="italic text-gray-200 mb-4">
                  "EdGine has completely transformed how I approach learning. The interactive courses and supportive community have helped me achieve my goals faster than I thought possible."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-white">Maria Garcia</p>
                    <p className="text-sm text-gray-300">Data Science Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
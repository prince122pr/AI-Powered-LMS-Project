import { useState } from "react";
import logo from "../assets/EdGine_Logos/logo-png.png";
import google from "../assets/EdGine_Logos/Google-logo.png";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { NavLink} from "react-router-dom";
import axios from "axios";
import { backendBaseURL } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Login = () => {
const navigate = useNavigate();

let [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "", 
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(backendBaseURL + "/auth/login", form, {withCredentials:true});
      // console.log(res.data);
      setLoading(false);
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login Failed. Please check your credentials.");
    }
  };

  return (
    <div className="bg-[#f5f6fa] min-h-screen flex items-center justify-center">
      <form
        className="font-[f4] w-full max-w-4xl bg-white shadow-2xl rounded-3xl flex overflow-hidden "
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {/* Left */}
        <div className="md:w-1/2 w-full h-full flex flex-col items-center justify-center gap-2 py-10 px-6">
          <div className="w-full flex flex-col items-center gap-1">
            <h1 className="font-bold text-gray-900 text-3xl">Welcome Back</h1>
            <h2 className="text-gray-500 text-lg">Login to your account</h2>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-sm mt-4">
            <label className="flex flex-col gap-1">
              <span className="font-medium text-gray-700">Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="Your Email"
                required
                autoFocus
                autoComplete="username"
                tabIndex={0}
              />
            </label>

            <label className="flex flex-col gap-1 relative">
              <span className="font-medium text-gray-700">Password</span>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 transition pr-10"
                placeholder="Your Password"
                required
                minLength={6}
                autoComplete="current-password"
                tabIndex={0}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-9 text-xl text-gray-500 hover:text-orange-500 transition"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </label>
          </div>

          <button
            type="submit"
            className="w-full max-w-sm py-3 mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 transition text-lg"
          >
            {loading?<ClipLoader size={20}/>:"Login"}
            </button>

          <span className="cursor-pointer text-black text-sm">Forget Password?</span>


          <div className="flex items-center w-full max-w-sm gap-2 my-2">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <button
            type="button"
            className="w-full max-w-sm flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 bg-white hover:bg-gray-50 transition"
          >
            <img className="w-6 h-6" src={google} alt="Google" />
            <span className="text-base text-gray-700 font-medium">
              Login with Google
            </span>
          </button>

          <div className="w-full max-w-sm text-center mt-4 text-gray-500 text-sm">
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className="text-orange-500 hover:underline font-medium"
            >
              Sign up
            </NavLink>
          </div>
        </div>

        {/* Right */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-black via-gray-900 to-gray-800 items-center justify-center">
          <img src={logo} alt="EdGine Logo" className="w-3/4 max-w-xs" />
        </div>
      </form>
    </div>
  );
};

export default Login;

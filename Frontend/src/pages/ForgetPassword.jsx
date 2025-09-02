import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { backendBaseURL } from "../App"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"

const ForgetPassword = () => {
  const [step, setStep] = useState(1)

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  

  // for step-1
   const sendOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post(backendBaseURL + "/auth/send-otp", { email }, {withCredentials:true});
      console.log(res.data);
      setLoading(false);
      setStep(2);
      toast.success("OTP sent to your email");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error in sending OTP!");
    }
   }

  // for step-2
  const verifyOTP = async () => {
    console.log("Verifying OTP:", otp);
    
    setLoading(true);
    try {
      const res = await axios.post(backendBaseURL + "/auth/verify-otp", { email, otp }, {withCredentials:true});
      console.log(res.data);
      setLoading(false);
      setStep(3);
      toast.success("OTP verified successfully!");
    }
        catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error in verifying OTP!");
    return}
    }

  // for step-3
  const resetPassword = async () => {
setLoading(true);
    try {
      if(newPassword !== confirmPassword){
        return toast.error("Passwords do not match!");
      }
      const res = await axios.post(backendBaseURL + "/auth/reset-password", { email, newPassword }, {withCredentials:true});
      console.log(res.data);
      setLoading(false);
      toast.success("Password reset successfully!");
      navigate("/login");
    } 

   catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error in resetting password!");
      return
    }

    }


  const navigate = useNavigate();


  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate("/login"); 
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md">
        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 mx-1 rounded-full ${
                step >= s ? "bg-orange-500" : "bg-gray-600"
              }`}
            ></div>
          ))}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-xl rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Forgot Your Password?
              </h2>
              <form
                className="space-y-5 font-[f4]"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter your email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="you@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <button onClick={sendOTP} className="w-full bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-md font-medium text-white shadow-md hover:shadow-lg transition-all">
                 {loading ? <ClipLoader size={20}/> : "Send OTP"} 
                </button>
              </form>
              <div
                onClick={() => navigate("/login")}
                className="font-[f4] text-center text-sm cursor-pointer text-gray-600 hover:text-orange-500 mt-4 transition"
              >
                Back to login
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-xl rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Enter OTP
              </h2>
              <form
                className="space-y-5 font-[f4]"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(3);
                }}
              >
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Please enter the 4-digit code sent to your email
                  </label>
                  <input
                    id="otp"
                    type="text"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 tracking-widest text-center"
                    placeholder="****"
                    required
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                    maxLength={4}
                  />
                </div>
                <div className="flex justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-1/2 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-md font-medium text-gray-800 shadow-md hover:shadow-lg transition-all"
                  >
                    Back
                  </button>
                  <button onClick={verifyOTP} disabled={loading} className="w-1/2 bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-md font-medium text-white shadow-md hover:shadow-lg transition-all">
                   {loading ? <ClipLoader size={20}/> : "Verify OTP"}  
                  </button>
                </div>
              </form>
              <div
                onClick={() => navigate("/login")}
                className="font-[f4] text-center text-sm cursor-pointer text-gray-600 hover:text-orange-500 mt-4 transition"
              >
                Back to login
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-xl rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Reset Password
              </h2>
              <form
                className="space-y-5 font-[f4]"
                onSubmit={(e) => {
                  e.preventDefault();
                  // navigate("/login");
                }}
              >
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="••••••••"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="••••••••"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                </div>
                <div className="flex justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-1/2 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-md font-medium text-gray-800 shadow-md hover:shadow-lg transition-all"
                  >
                    Back
                  </button>
                  <button onClick={resetPassword} className="w-1/2 bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md font-medium text-white shadow-md hover:shadow-lg transition-all">
                    {loading ? <ClipLoader size={20}/> : "Reset Password"}  
                  </button>
                </div>
              </form>
              <div
                onClick={() => navigate("/login")}
                className="font-[f4] text-center text-sm cursor-pointer text-gray-600 hover:text-orange-500 mt-4 transition"
              >
                Back to login
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ForgetPassword

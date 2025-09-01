import { useState } from "react"

const ForgetPassword = () => {
    const [step, setStep] = useState(1)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        
        {/* step-1 */}
        {step === 1 && <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
             <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forget Your Password</h2>
             <form className="space-y-4">
                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">Enter your email</label>
                    <input id="email" type="text" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2"/>
                </div>
             </form>
            </div>
            }

    </div>
  )
}

export default ForgetPassword
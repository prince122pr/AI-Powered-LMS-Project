import { IoStatsChart } from "react-icons/io5";
import {FaLaptop, FaCertificate } from "react-icons/fa";


const WhyChooseUsSec = () => {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-[f2] font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Why Choose EdGine?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-[f3]">
              Our platform combines cutting-edge technology with expert instruction to provide an unparalleled learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-orange-500/10 transition-all hover:-translate-y-2 border border-gray-700">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-6">
                <FaLaptop className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-[f2] font-bold mb-3 text-white">Interactive Learning</h3>
              <p className="text-gray-300 font-[f3]">
                Engage with interactive content, quizzes, and hands-on projects that reinforce your learning and keep you motivated.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-orange-500/10 transition-all hover:-translate-y-2 border border-gray-700">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-6">
                <IoStatsChart className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-[f2] font-bold mb-3 text-white">AI-Powered Progress Tracking</h3>
              <p className="text-gray-300 font-[f3]">
                Our AI analyzes your learning patterns and provides personalized recommendations to optimize your study time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-orange-500/10 transition-all hover:-translate-y-2 border border-gray-700">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-6">
                <FaCertificate className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-[f2] font-bold mb-3 text-white">Recognized Certifications</h3>
              <p className="text-gray-300 font-[f3]">
                Earn industry-recognized certificates upon course completion to showcase your skills to employers.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default WhyChooseUsSec
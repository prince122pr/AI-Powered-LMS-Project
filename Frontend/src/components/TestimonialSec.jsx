
const TestimonialSec = () => {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-12 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-[f2] font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  What Our Students Say
                </h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto font-[f3]">
                  Hear from our community of learners about their experiences with EdGine.
                </p>
              </div>
    
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Testimonial 1 */}
                <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      J
                    </div>
                    <div className="ml-4">
                      <h4 className="font-[f2] font-bold">James Wilson</h4>
                      <p className="text-sm text-gray-400">Web Development Student</p>
                    </div>
                  </div>
                  <p className="text-gray-300 font-[f3]">
                    "The interactive coding exercises and real-time feedback have dramatically improved my programming skills. I landed a job as a junior developer within 3 months of completing my course!"
                  </p>
                  <div className="mt-4 text-yellow-500">★★★★★</div>
                </div>
    
                {/* Testimonial 2 */}
                <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      M
                    </div>
                    <div className="ml-4">
                      <h4 className="font-[f2] font-bold">Maria Garcia</h4>
                      <p className="text-sm text-gray-400">Data Science Student</p>
                    </div>
                  </div>
                  <p className="text-gray-300 font-[f3]">
                    "The AI-powered recommendations helped me focus on areas where I needed improvement. The course content is cutting-edge and relevant to today's industry demands."
                  </p>
                  <div className="mt-4 text-yellow-500">★★★★★</div>
                </div>
    
                {/* Testimonial 3 */}
                <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      R
                    </div>
                    <div className="ml-4">
                      <h4 className="font-[f2] font-bold">Robert Chen</h4>
                      <p className="text-sm text-gray-400">Digital Marketing Student</p>
                    </div>
                  </div>
                  <p className="text-gray-300 font-[f3]">
                    "The certification I earned through EdGine helped me secure clients for my freelance business. The practical assignments gave me a portfolio of real-world projects to showcase."
                  </p>
                  <div className="mt-4 text-yellow-500">★★★★★</div>
                </div>
              </div>
            </div>
          </section>
  )
}

export default TestimonialSec
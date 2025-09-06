import { useEffect } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const About = () => {
  // Scroll to top on component mount
  let navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gray-50 pt-10">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              About EdGine
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Transforming education through AI-powered learning experiences
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/src/assets/Some_Images/bg-1.jpg')] bg-cover bg-center opacity-20"></div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">Our Mission</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <p className="text-lg text-gray-700 mb-6">
                At EdGine, we believe that education should be accessible, engaging, and personalized for every learner. Our mission is to leverage the power of artificial intelligence to create a learning experience that adapts to individual needs, learning styles, and goals.
              </p>
              <p className="text-lg text-gray-700">
                We're committed to bridging the gap between traditional education and cutting-edge technology, providing students and educators with tools that enhance the learning journey and unlock new possibilities for knowledge acquisition and skill development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 text-center">What Makes EdGine Special</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">AI-Powered Learning</h3>
              <p className="text-gray-600">
                Our platform uses advanced AI algorithms to analyze learning patterns and provide personalized recommendations, helping students learn more effectively.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Customizable Courses</h3>
              <p className="text-gray-600">
                Educators can create and customize courses with interactive content, assessments, and resources tailored to their teaching style and students' needs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Secure & Reliable</h3>
              <p className="text-gray-600">
                We prioritize data security and platform reliability, ensuring a safe learning environment with consistent access to educational resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 text-center">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-orange-400 to-red-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-800">Sarah Johnson</h3>
                <p className="text-orange-500 mb-4">Founder & CEO</p>
                <p className="text-gray-600">
                  With over 15 years in EdTech, Sarah leads our vision to transform education through AI innovation.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-orange-400 to-red-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-800">David Chen</h3>
                <p className="text-orange-500 mb-4">CTO</p>
                <p className="text-gray-600">
                  David brings expertise in AI and machine learning to create our adaptive learning algorithms.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-orange-400 to-red-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-800">Maya Patel</h3>
                <p className="text-orange-500 mb-4">Head of Education</p>
                <p className="text-gray-600">
                  Former educator Maya ensures our platform meets real classroom needs and pedagogical standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the EdGine Community</h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Be part of the future of education. Whether you're a student eager to learn or an educator looking to innovate, EdGine has something for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/')} 
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium shadow-md hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 hover:scale-105 duration-300"
              >
                Get Started
              </button>
              <button 
                onClick={() => navigate('/courses')} 
                className="px-8 py-3 border-2 border-orange-500 text-white rounded-xl text-base font-medium bg-transparent hover:bg-gradient-to-r from-orange-500 to-orange-600 hover:border-transparent transition-all duration-300 shadow-md hover:shadow-orange-500/30 transform hover:-translate-y-1 hover:scale-105"
              >
                Explore Courses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
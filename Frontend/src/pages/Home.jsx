
import Navbar from "../components/Navbar";

import HeroSection from "../components/HeroSection";
import WhyChooseUsSec from "../components/WhyChooseUsSec";
import FeaturedCourses from "../components/FeaturedCourses";
import StatsSec from "../components/StatsSec";
import TestimonialSec from "../components/TestimonialSec";
import CTASec from "../components/CTASec";
import Footer from "../components/Footer";


const Home = () => {


  return (
    <div className="w-full overflow-hidden bg-gray-50">

      <Navbar />

      {/*Main section  */}
      <HeroSection/>

      {/* Features Section */}
      <WhyChooseUsSec/>

      {/* Featured Courses Section */}
      <FeaturedCourses/>
      
      {/* Stats Section */}
      <StatsSec/>

      {/* Testimonial Section */}
      <TestimonialSec/>

      {/* Call To Action - Section */}
      <CTASec/>

      {/* Footer */}
      <Footer/>

    </div>
  );
};

export default Home;
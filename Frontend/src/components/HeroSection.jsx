import { useEffect, useState } from "react";
import heroImg from "../assets/Some_Images/bg-1.jpg";
import logo from "../assets/EdGine_Logos/logo-png.png";
import search from "../assets/Some_Images/search-icon.png";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
  const navigate = useNavigate();
      useEffect(() => {
    setIsVisible(true);
  }, []);

    const [isVisible, setIsVisible] = useState(false);
  return (
   <div className="w-full h-[100vh] relative">
           <div className="absolute inset-0 bg-black/50 z-10"></div>
           <img className="w-full h-full object-cover" src={heroImg} alt="Hero background" />
           
           <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-12 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
             <img src={logo} alt="EdGine Logo" className="w-[180px] sm:mb-4 animate-pulse " />
             <h1 className="text-4xl md:text-6xl font-[f2] text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-300 mt-10">
               Elevate Your Learning Experience
             </h1>
             <p className="text-xl md:text-2xl font-[f3] text-center max-w-3xl text-gray-100">
               Discover a new way to learn with our cutting-edge platform powered by AI. Access high-quality courses anytime, anywhere.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 mt-4">
               <button 
                 onClick={() => navigate("/search-ai")}
                 className="px-8 py-3 cursor-pointer rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-[f2] text-lg font-medium shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center gap-3 animate-bounce"
               >
                 Search With AI <img className="w-8" src={search} alt="search-image" />
   
               </button>
               <button 
                  onClick={() => navigate("/courses")}
                 className="px-8 py-3 rounded-xl bg-transparent border-2 border-white text-white font-[f2] text-lg font-medium shadow-lg hover:bg-white/10 transition-all transform hover:-translate-y-1"
               >
                 Explore Courses
               </button>
             </div>
           </div>
         </div>
  )
}

export default HeroSection
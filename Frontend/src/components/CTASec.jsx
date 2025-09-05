import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CTASec = () => {
      const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user || {});

  return (
   <section className="py-20 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-black to-gray-900 text-white text-center">
           <div className="max-w-4xl mx-auto">
             <h2 className="text-3xl md:text-5xl font-[f2] font-bold mb-6">
               Ready to Transform Your Learning Journey?
             </h2>
             <p className="text-xl text-gray-300 mb-10 font-[f3]">
               Join thousands of students who are already experiencing the future of education with EdGine.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button 
                 onClick={()=>navigate("/courses")}
                 className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-[f2] text-xl font-medium shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 hover:scale-105"
               >
                 Start Learning Today
               </button>
               {userData ? (
                 <button 
                   onClick={()=>navigate("/dashboard")}
                   className="px-8 py-4 rounded-xl bg-transparent border-2 border-white text-white font-[f2] text-xl font-medium shadow-lg hover:bg-white/10 transition-all transform hover:-translate-y-1"
                 >
                   My Dashboard
                 </button>
               ) : (
                 <button 

                   className="px-8 py-4 rounded-xl bg-transparent border-2 border-white text-white font-[f2] text-xl font-medium shadow-lg hover:bg-white/10 transition-all transform hover:-translate-y-1"
                 >
                   Sign In
                 </button>
               )}
             </div>
           </div>
         </section>
  )
}

export default CTASec
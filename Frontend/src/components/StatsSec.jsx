  import { FaGraduationCap, FaLaptop, FaUsers } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
  // Stats data
  const stats = [
    { id: 1, value: "10K+", label: "Students", icon: <FaUsers className="text-3xl text-orange-500" /> },
    { id: 2, value: "200+", label: "Courses", icon: <FaGraduationCap className="text-3xl text-orange-500" /> },
    { id: 3, value: "50+", label: "Instructors", icon: <FaLaptop className="text-3xl text-orange-500" /> },
    { id: 4, value: "95%", label: "Satisfaction", icon: <MdOutlineRateReview className="text-3xl text-orange-500" /> }
  ];

const StatsSec = () => {
  return (
    <section className="py-16 px-4 sm:px-6 md:px-12 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-[f2] font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-white/80 font-[f3]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default StatsSec
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const FeaturedCourses = () => {
  const featuredCourses = useSelector((store) => store.course.allCourses || []);

  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 md:px-12 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-[f2] font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-black">
            Featured Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-[f3]">
            Explore our most popular courses and start your learning journey today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* just get 3 */}
          {featuredCourses.slice(0, 3).map((course) => (
            <Link
              to={`/course/${course._id}`}
              key={course._id}
              className="block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-orange-100 text-orange-600 rounded-full">
                    {course.category}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-700 ml-1">{course.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-[f2] font-bold mb-2 text-gray-900">
                  {course.title}
                </h3>

                <div className="flex w-full justify-between items-center font-[f3] mb-4">
                  <p className="text-gray-600 text-sm">
                    By {course.creator?.name || course.instructor || "Unknown"}
                  </p>
                    <div className="mt-1 text-xl font-[f4]">
                      <span className="text-gray-500 line-through mr-2">₹{(course.price) + 1000}</span>
                      <span className="text-red-700">₹{course.price}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{course.students || 0} students</span>
                  <button className="text-sm font-medium text-orange-600 hover:text-orange-700">
                    Learn More →
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 text-white font-[f2] text-lg font-medium shadow-lg hover:shadow-gray-500/30 transition-all transform hover:-translate-y-1 hover:scale-105"
          >
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;

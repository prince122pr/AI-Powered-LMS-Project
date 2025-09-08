import { useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

function EnrolledCourse() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
 

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 px-4 py-9 relative">
      {/* Back Button */}
      <FaArrowLeftLong
        className="absolute top-20 left-5 w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600 transition"
        onClick={() => navigate("/")}
      />

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-8">
        My Enrolled Courses
      </h1>

      {userData.enrolledCourses.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          You haven’t enrolled in any course yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {userData.enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-gray-200 transform transition hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Course Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Course Info */}
              <div className="p-5 flex flex-col justify-between h-48">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                    {course.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">{course.category}</p>
                  <p className="text-sm text-gray-700">{course.level}</p>
                </div>

                {/* Watch Now Button */}
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="cursor-pointer mt-4 w-full py-2 rounded-xl font-medium text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg transition transform flex items-center justify-center gap-2"
                >
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EnrolledCourse;

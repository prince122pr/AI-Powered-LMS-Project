import { useState, useEffect } from "react";
import axios from "axios";
import { backendBaseURL } from "../../App";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GiReceiveMoney } from "react-icons/gi";

import { 
  FaGraduationCap, 
  FaUsers, 
  FaBookOpen, 
  FaEdit, 
  FaEye, 
  FaTrash,
  FaPlus,
  FaChalkboardTeacher
} from "react-icons/fa";
import { MdPublish } from "react-icons/md";

const Dashboard = () => {

    const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const user = useSelector((state) => state.user.userData);

  // Stats derived from courses
  const totalCourses = courses.length;
  const publishedCourses = courses.filter(course => course.isPublished).length;
  const totalStudents = courses.reduce((total, course) => 
    total + (course.enrolledStudents?.length || 0), 0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendBaseURL}/course/creator-courses`, {
          withCredentials: true,
        });
        setCourses(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load your courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user]);

  // Animation effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`${backendBaseURL}/course/delete-course/${courseId}`, {
          withCredentials: true,
        });
        // Remove the deleted course from state
        setCourses(courses.filter(course => course._id !== courseId));
      } catch (err) {
        console.error("Error deleting course:", err);
        alert("Failed to delete course. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-[f2] text-white">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-md w-full">
          <div className="text-red-500 text-center mb-4 text-5xl">⚠️</div>
          <h2 className="text-2xl font-[f2] text-white text-center mb-4">Something went wrong</h2>
          <p className="text-white/80 text-center mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      

      {/* Header Section */}
      <div className={`relative py-12 mt-6 px-4 sm:px-6 lg:px-8 mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-600/20 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <FaChalkboardTeacher className="text-4xl text-orange-500" />
                <h1 className="text-3xl md:text-4xl font-[f2] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-300">
                  Educator Dashboard
                </h1>
              </div>
              <p className="text-white/70 max-w-2xl">
                Manage your courses, track student progress, and create engaging learning experiences.
              </p>
              <button onClick={() => navigate(-1)} className="cursor-pointer px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 
             text-white font-medium rounded-xl shadow-md 
             hover:from-orange-600 hover:to-red-500 
             transition-all duration-300 ease-in-out 
             flex items-center gap-2 hover:scale-105 mt-6"
>
  ⬅ Go Back
</button>
            </div>
            
            <Link 
              to="/create-course" 
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-[f2] text-lg font-medium shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2"
            >
              <FaPlus className="text-sm" />
              Create New Course
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Stats Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium mb-1 group-hover:text-orange-300 transition-colors">Total Courses</h3>
                <p className="text-4xl font-[f2] font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 transition-all">{totalCourses}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-lg">
                <FaBookOpen className="text-2xl text-orange-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium mb-1 group-hover:text-orange-300 transition-colors">Published Courses</h3>
                <p className="text-4xl font-[f2] font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 transition-all">{publishedCourses}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-lg">
                <MdPublish className="text-2xl text-orange-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium mb-1 group-hover:text-orange-300 transition-colors">Total Students</h3>
                <p className="text-4xl font-[f2] font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 transition-all">{totalStudents}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-lg">
                <FaUsers className="text-2xl text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium mb-1 group-hover:text-orange-300 transition-colors">Total Earning</h3>
                <p className="text-4xl font-[f2] font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 transition-all">{totalStudents}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-lg">
                <GiReceiveMoney className="text-2xl text-orange-500" />

              </div>
            </div>
          </div>

        </div>

        {/* Courses List */}
        <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl border border-gray-700 overflow-hidden transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
          <div className="px-6 py-4 border-b border-gray-700 flex items-center">
            <FaGraduationCap className="text-xl text-orange-500 mr-3" />
            <h2 className="text-xl font-[f2] font-semibold text-white">Your Courses</h2>
          </div>

          {courses.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="text-3xl text-orange-500" />
              </div>
              <p className="text-gray-400 mb-6">You haven't created any courses yet.</p>
              <Link 
                to="/create-course" 
                className="flex px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 hover:scale-105 items-center w-fit gap-2 cursor-pointer text-center mx-auto"
              >
                <FaPlus className="text-sm" />
                Create Your First Course
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Students
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {courses.map((course) => (
                    <tr key={course._id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {course.thumbnail ? (
                            <img 
                              className="h-12 w-12 rounded-lg object-cover mr-4 border-2 border-gray-700 shadow-md" 
                              src={course.thumbnail} 
                              alt={course.title} 
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 mr-4 flex items-center justify-center text-gray-400 border-2 border-gray-700 shadow-md">
                              <FaGraduationCap className="text-xl" />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-white">{course.title}</div>
                            {course.subTitle && (
                              <div className="text-sm text-gray-400">{course.subTitle}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{course.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{course.level}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {course.enrolledStudents?.length || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${
                          course.isPublished 
                            ? "bg-green-900/30 text-green-400 border border-green-500/30" 
                            : "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30"
                        }`}>
                          {course.isPublished ? (
                            <>
                              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                              Published
                            </>
                          ) : (
                            <>
                              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                              Draft
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <Link 
                            to={`/update-course/${course._id}`} 
                            className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                          >
                            <FaEdit className="text-xs" />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteCourse(course._id)}
                            className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                          >
                            <FaTrash className="text-xs" />
                            Delete
                          </button>
                          <Link 
                            to={`/course/${course._id}`} 
                            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                          >
                            <FaEye className="text-xs" />
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";   //gives us the current URL's query string.

import {
  FaGraduationCap,
  FaSearch,
  FaFilter,
  FaStar,
  FaUsers,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import Navbar from "../components/Navbar";
import { getAllCourses } from "../store/actions/courseActions";

const Courses = () => {

  const location = useLocation();
  const query = new URLSearchParams(location.search);   //URLSearchParams is a native browser API that helps parse query strings into key-value pairs.
  const category = query.get("category"); // "Web Development" if URL is /courses?category=Web%20Development
  
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.allCourses || []);
  const user = useSelector((state) => state.user.userData);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ category: "", level: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use category to filter courses providing by home page footer click
  useEffect(() => {
    if (category) {
      setFilters({ category });
    }
  }, [category]);

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        await dispatch(getAllCourses());
      } catch (err) {
        console.log(err);
        
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
    setIsVisible(true);
  }, [dispatch]);

  // Filter & search logic
  useEffect(() => {
    let result = courses;

    if (searchTerm) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (course.subTitle &&
            course.subTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (course.description &&
            course.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filters.category) {
      result = result.filter((course) => course.category === filters.category);
    }

    if (filters.level) {
      result = result.filter((course) => course.level === filters.level);
    }

    setFilteredCourses(result);
  }, [searchTerm, filters, courses]);

  // Unique categories
  const categories = [...new Set(courses.map((c) => c.category))].filter(Boolean);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({ category: "", level: "" });
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-xl font-[f2] text-white">Loading courses...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-[f2] text-white mb-4">{error}</h2>
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
    <div className="min-h-screen pt-15 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Header */}
        <div
          className={`relative mb-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FaChalkboardTeacher className="text-4xl text-orange-500" />
                <h1 className="text-3xl md:text-4xl font-[f2] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-300">
                  Explore Courses
                </h1>
              </div>
              <p className="text-white/70 max-w-2xl">
                Discover high-quality courses taught by expert instructors.
              </p>
            </div>

            {user?.role === "educator" && (
              <Link
                to="/create-course"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-[f2] text-lg font-medium shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2"
              >
                <FaGraduationCap className="text-sm" />
                Create Course
              </Link>
            )}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white hover:bg-gray-700 transition-all flex items-center gap-2"
            >
              <FaFilter className="text-orange-500" /> Filters
            </button>

            {(filters.category || filters.level || searchTerm) && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 rounded-lg bg-red-500/20 border border-red-500/30 text-white hover:bg-red-500/30 transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 transition-all">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-white mb-2 font-medium">
                    <MdCategory className="text-orange-500" /> Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-white mb-2 font-medium">
                    <FaGraduationCap className="text-orange-500" /> Level
                  </label>
                  <select
                    value={filters.level}
                    onChange={(e) => handleFilterChange("level", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
                  >
                    <option value="">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center py-16 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center mb-4">
              <FaSearch className="text-3xl text-orange-500" />
            </div>
            <h3 className="text-xl font-[f2] text-white mb-2">No courses found</h3>
            <p className="text-white/70 text-center max-w-md mb-6">
              We couldn't find any courses matching your search criteria.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {filteredCourses.map((course) => (
              <Link
                key={course._id}
                to={`/course/${course._id}`}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl border border-gray-700 overflow-hidden hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="relative h-48 overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center">
                      <FaGraduationCap className="text-5xl text-gray-500" />
                    </div>
                  )}
                  <div className="absolute top-0 right-0 m-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        course.level === "Beginner"
                          ? "bg-green-900/70 text-green-400 border border-green-500/30"
                          : course.level === "Intermediate"
                          ? "bg-blue-900/70 text-blue-400 border border-blue-500/30"
                          : "bg-purple-900/70 text-purple-400 border border-purple-500/30"
                      }`}
                    >
                      {course.level}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-900/30 text-orange-400 border border-orange-500/30">
                      {course.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-[f2] font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {course.title}
                  </h3>

                  {course.subTitle && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.subTitle}</p>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-orange-500" />
                      <span className="text-gray-300 text-sm">
                        {course.enrolledStudents?.length || 0} students
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-gray-500" />
                    </div>
                  </div>

                  {course.price ? (
                    <div className="mt-1 text-xl font-[f4]">
                      <span className="text-gray-500 line-through mr-2">₹{course.price + 1000}</span>
                      <span className="text-red-500">₹{course.price}</span>
                    </div>
                  ) : (
                    <div className="mt-4 text-xl font-bold text-green-500">Free</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

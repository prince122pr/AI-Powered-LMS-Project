import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { backendBaseURL } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { 
  FaGraduationCap, 
  FaArrowLeft, 
  FaUpload, 
  FaSave,
  FaTimes,
  FaCheck
} from "react-icons/fa";
import { MdTitle, MdDescription, MdCategory, MdAttachMoney } from "react-icons/md";
import Navbar from "../../components/Navbar";
import { getLectures } from "../../store/actions/lectureActions";

const EditCourses = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  
  const [courseData, setCourseData] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    level: "Beginner",
    price: "",
    thumbnail: null,
    isPublished: false
  });

      useEffect(() => {
        dispatch(getLectures(courseId))
    }, [dispatch, courseId, courseData])

  // Animation effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetch course data
  // useEffect(() => {
  //   const fetchCourse = async () => {
  //     try {
  //       setFetchLoading(true);
  //       const response = await axios.get(`${backendBaseURL}/course/course/${courseId}`, {
  //         withCredentials: true,
  //       });
        
  //       const course = response.data;
        
  //       setCourseData({
  //         title: course.title || "",
  //         subTitle: course.subTitle || "",
  //         description: course.description || "",
  //         category: course.category || "",
  //         level: course.level || "Beginner",
  //         price: course.price || "",
  //         thumbnail: null, // We don't set the file object, just the preview
  //         isPublished: course.isPublished || false
  //       });
        
  //       if (course.thumbnail) {
  //         setThumbnailPreview(course.thumbnail);
  //       }
        
  //       setFetchError(null);
  //     } catch (error) {
  //       console.error("Error fetching course:", error);
  //       setFetchError("Failed to load course data. Please try again later.");
  //     } finally {
  //       setFetchLoading(false);
  //     }
  //   };

  //   if (courseId && user) {
  //     fetchCourse();
  //   }
  // }, [courseId, user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "file") {
      if (files[0]) {
        setCourseData({
          ...courseData,
          thumbnail: files[0]
        });
        
        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setThumbnailPreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }
    } else if (type === "checkbox") {
      setCourseData({
        ...courseData,
        [name]: checked
      });
    } else {
      setCourseData({
        ...courseData,
        [name]: value
      });
    }
  };

  const removeThumbnail = () => {
    setCourseData({
      ...courseData,
      thumbnail: null
    });
    setThumbnailPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting course data:", courseData);
    
    if (!courseData.title || !courseData.category) {
      toast.error("Title and category are required!");
      return;
    }
    
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append("title", courseData.title);
      formData.append("subTitle", courseData.subTitle);
      formData.append("description", courseData.description);
      formData.append("category", courseData.category);
      formData.append("level", courseData.level);
      formData.append("price", courseData.price);
      formData.append("isPublished", courseData.isPublished);
      formData.append("creator", user._id);
      console.log("FormData before submit:", formData);
      if (courseData.thumbnail) {
        formData.append("thumbnail", courseData.thumbnail);
      }
      
      await axios.post(
        `${backendBaseURL}/course/update-course/${courseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      
      toast.success("Course updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Update error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-white text-xl">Please login to edit courses</div>
        </div>
      </div>
    );
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-xl font-[f2] text-white">Loading course data...</div>
          </div>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-md w-full">
            <div className="text-red-500 text-center mb-4 text-5xl">⚠️</div>
            <h2 className="text-2xl font-[f2] text-white text-center mb-4">Something went wrong</h2>
            <p className="text-white/80 text-center mb-6">{fetchError}</p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate("/dashboard")} 
                className="flex-1 py-3 rounded-xl bg-gray-700 text-white font-medium shadow-lg hover:bg-gray-600 transition-all"
              >
                Back to Dashboard
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className={`relative mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10'}`}>
          <div className="flex items-center gap-3 mb-2">
            <button 
              onClick={() => navigate("/dashboard")}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <FaArrowLeft className="text-orange-500" />
            </button>
            <h1 className="text-3xl md:text-4xl font-[f2] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-300">
              Edit Course
            </h1>
          </div>
          <p className="text-white/70 ml-10">
            Update your course information below. Fields marked with * are required.
          </p>
        </div>
        
        {/* Form */}
        <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl border border-gray-700 overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
          <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <FaGraduationCap className="text-xl text-orange-500 mr-3" />
              <h2 className="text-xl font-[f2] font-semibold text-white">Course Information</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-xs leading-5 font-semibold rounded-full flex items-center gap-1 ${
                courseData.isPublished 
                  ? "bg-green-900/30 text-green-400 border border-green-500/30" 
                  : "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30"
              }`}>
                {courseData.isPublished ? (
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
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="flex items-center gap-2 text-white mb-2 font-medium">
                    <MdTitle className="text-orange-500" />
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={courseData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
                    placeholder="e.g. Advanced JavaScript Masterclass"
                    required
                  />
                </div>
                
                {/* Subtitle */}
                <div>
                  <label className="flex items-center gap-2 text-white mb-2 font-medium">
                    <MdTitle className="text-orange-500 opacity-70" />
                    Subtitle
                  </label>
                  <input
                    type="text"
                    name="subTitle"
                    value={courseData.subTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
                    placeholder="e.g. Learn modern JavaScript from basics to advanced"
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label className="flex items-center gap-2 text-white mb-2 font-medium">
                    <MdDescription className="text-orange-500" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={courseData.description}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all resize-none"
                    placeholder="Provide a detailed description of your course..."
                  ></textarea>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Category */}
                <div>
                  <label className="flex items-center gap-2 text-white mb-2 font-medium">
                    <MdCategory className="text-orange-500" />
                    Category *
                  </label>
                  <select
                    name="category"
                    value={courseData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Photography">Photography</option>
                    <option value="Music">Music</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                {/* Level */}
                <div>
                  <label className="flex items-center gap-2 text-white mb-2 font-medium">
                    <FaGraduationCap className="text-orange-500" />
                    Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <label 
                        key={level} 
                        className={`flex items-center justify-center px-4 py-3 rounded-lg border ${
                          courseData.level === level 
                            ? "border-orange-500 bg-orange-500/20 text-white" 
                            : "border-gray-600 bg-gray-700/30 text-gray-300 hover:bg-gray-700/50"
                        } cursor-pointer transition-all text-center`}
                      >
                        <input
                          type="radio"
                          name="level"
                          value={level}
                          checked={courseData.level === level}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        {level}
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price */}
                <div>
                  <label className="flex items-center gap-2 text-white mb-2 font-medium">
                    <MdAttachMoney className="text-orange-500" />
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={courseData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
                    placeholder="e.g. 15999"
                  />
                </div>
                
                {/* Thumbnail */}
                <div>
                  <label className="flex items-center gap-2 text-white mb-2 font-medium">
                    <FaUpload className="text-orange-500" />
                    Thumbnail
                  </label>
                  
                  {thumbnailPreview ? (
                    <div className="relative mb-4">
                      <img 
                        src={thumbnailPreview} 
                        alt="Thumbnail preview" 
                        className="w-full h-40 object-cover rounded-lg border border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={removeThumbnail}
                        className="absolute top-2 right-2 p-1 rounded-full bg-red-500/80 text-white hover:bg-red-600 transition-colors"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-40 px-4 py-6 rounded-lg border-2 border-dashed border-gray-600 bg-gray-700/30 hover:bg-gray-700/50 cursor-pointer transition-all">
                      <FaUpload className="text-2xl text-gray-400 mb-2" />
                      <span className="text-gray-400">Click to upload thumbnail</span>
                      <input
                        type="file"
                        name="thumbnail"
                        onChange={handleInputChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                
                {/* Publish Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={courseData.isPublished}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-600 text-orange-500 focus:ring-orange-500/50 bg-gray-700"
                  />
                  <label htmlFor="isPublished" className="ml-2 text-white">
                    {courseData.isPublished ? "Published" : "Publish course"}
                  </label>
                </div>
              </div>
            </div>
            
            {/* Submit Buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 rounded-xl bg-gray-700 text-white font-medium hover:bg-gray-600 transition-all flex items-center gap-2"
              >
                <FaTimes />
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-[f2] text-lg font-medium shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <FaCheck />
                    Update Course
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourses;
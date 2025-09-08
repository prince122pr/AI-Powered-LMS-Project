import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoPersonOutline, IoMailOutline, IoSchoolOutline, IoImageOutline, IoSaveOutline, IoCloseCircleOutline } from "react-icons/io5";
import { MdDescription } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";
import { backendBaseURL } from "../App";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../store/actions/userActions";
import { FaArrowLeftLong } from "react-icons/fa6";
import profImg from "../assets/Some_Images/avatar-image.webp"


const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const fileInputRef = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageFile: null
  });

  useEffect(() => {
    // Trigger entrance animation after component mounts
    setFormVisible(true);
    
    // Initialize form with user data if available
    if (userData) {
      setForm({
        name: userData.name || "",
        description: userData.description || "",
        imageFile: null
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, imageFile: file });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImageSelection = () => {
    setForm({ ...form, imageFile: null });
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      if (form.description) formData.append("description", form.description);
      if (form.imageFile) formData.append("imageUrl", form.imageFile);
      
      const response = await axios.post(
        `${backendBaseURL}/user/profile`, 
        formData, 
        { 
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      
      dispatch(currentUser());
      setLoading(false);
      toast.success("Profile updated successfully!", {
        position: "bottom-right"
      });
      
      // Clear image selection after successful update
      clearImageSelection();
      
    } catch (error) {
      console.error("Profile update error:", error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <ClipLoader size={40} color="#f97316" />
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
       <FaArrowLeftLong
              className="absolute top-20 left-5 w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600 transition"
              onClick={() => navigate("/")}
            />
      <div className="flex-grow container mx-auto px-4 py-24 sm:px-6 lg:px-8  font-[f2]">
        <div 
          className={`max-w-5xl mx-auto transition-all duration-700 transform ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black p-8 sm:p-10 text-white relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-orange-500"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-red-500"></div>
              </div>
              
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center overflow-hidden border-4 border-white/20 shadow-lg">
                  {userData.imageUrl ? (
                    <img 
                      src={userData.imageUrl} 
                      alt={userData.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img src={profImg} />
                  )
                  }
                </div>
                
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                  <div className="flex flex-col sm:flex-row gap-3 text-gray-300 text-sm">
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      <IoMailOutline className="text-orange-400" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      <IoSchoolOutline className="text-orange-400" />
                      <span className="capitalize">{userData.role}</span>
                    </div>
                  </div>
                  
                  {userData.description && (
                    <p className="mt-3 text-gray-200 max-w-3xl font-[f1] text-lg">
                      {userData.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Profile Form */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IoPersonOutline className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>
                
                {/* Description Input */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                    Bio / Description
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <MdDescription className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 min-h-[120px]"
                      placeholder="Tell us about yourself"
                    />
                  </div>
                </div>
                
                {/* Profile Picture Input */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Profile Picture
                  </label>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    {/* Preview */}
                    <div className="w-32 h-32 rounded-xl bg-gray-100 border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                      {profImg ? (
                        <img 
                          src={profImg} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : userData.imageUrl ? (
                        <img 
                          src={userData.imageUrl || profImg} 
                          alt={userData.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <IoImageOutline className="text-4xl text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="relative">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          accept="image/*"
                          className="hidden"
                          id="profile-image"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          className="cursor-pointer w-full sm:w-auto px-4 py-2.5 border-2 border-orange-500 text-orange-600 rounded-xl font-medium hover:bg-orange-50 transition-colors"
                        >
                          Choose Image
                        </button>
                        
                        {previewImage && (
                          <button
                            type="button"
                            onClick={clearImageSelection}
                            className="ml-2 px-3 py-2.5 text-gray-600 hover:text-red-500 transition-colors"
                          >
                            <IoCloseCircleOutline className="inline mr-1 text-lg" />
                            Clear
                          </button>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        Recommended: Square image, at least 300x300 pixels
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <ClipLoader size={20} color="white" />
                        <span className="ml-2">Updating...</span>
                      </div>
                    ) : (
                      <>
                        <IoSaveOutline className="inline mr-1.5 text-lg" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Enrolled Courses Section */}
            {userData.enrolledCourses && userData.enrolledCourses.length > 0 ? (
              <div className="border-t border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Enrolled Courses
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userData.enrolledCourses.map((course) => (
                    <div 
                      key={course._id} 
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-gray-800">{course.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{course.instructor}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Enrolled Courses
                </h2>
                <p className="text-gray-500">
                  You are not enrolled in any courses yet.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/courses')}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl shadow-md hover:shadow-orange-500/20 transition-all duration-300"
                >
                  Browse Courses
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
import { useState } from "react";
import { IoSearch, IoSparkles } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/EdGine_Logos/logo-png.png";
import { MdOutlineMicExternalOn } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { backendBaseURL } from "../App";
import { FaGraduationCap, FaStar, FaUsers } from "react-icons/fa";
import start from "../assets/start.mp3"

const SearchWithAI = () => {
  const startSound = new Audio(start)
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      handleRecommendation(searchQuery);
    }
  };

  const handleRecog = async () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported!");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      setIsSearching(true);
      toast.info("🎤 Listening...");
    };

    startSound.play();

    recognition.onend = () => {
      setIsSearching(false);
    };

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setSearchQuery(transcript);
      handleRecommendation(transcript);
    };

    recognition.start();
  };

  const speak = (message) => {
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  const handleRecommendation = async (query) => {
    try {
      const res = await axios.get(`${backendBaseURL}/course/search-with-ai`, {
        params: { input: query },
        withCredentials: true,
      });
      setRecommendations(res.data);
      if(res.data.length>0) speak('These are the top courses I found for you')
      else speak('No courses found')
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearching(false);
    }
  };

  

  return (
    <div className="w-full min-h-screen bg-[#0F172A] relative pt-20">
      {/* Background */}
     

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center min-h-screen px-4 sm:px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 
             text-white font-medium rounded-xl shadow-md 
             hover:from-orange-600 hover:to-red-500 
             transition-all duration-300 ease-in-out 
             flex items-center gap-2 hover:scale-105"
        >
          ⬅ Go Back
        </button>

        {/* Logo */}
        <img
          src={logo}
          alt="EdGine Logo"
          className="w-[150px] sm:w-[180px] mt-20 mb-6 animate-pulse"
        />

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <IoSparkles className="text-4xl text-orange-400 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-300">
              AI-Powered Search
            </h1>
            <IoSparkles className="text-4xl text-orange-400 animate-pulse" />
          </div>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Discover courses with intelligent search. Our AI understands your
            needs and finds the perfect learning path for you.
          </p>
        </div>

        {/* Search Section */}
        <div className="w-full max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask me anything... 'Python for beginners' or 'Advanced data science courses'"
              className="w-full px-6 py-4 pr-28 text-lg bg-white/10 backdrop-blur-lg border-2 border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:bg-white/15 transition-all duration-300"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            {/* Buttons */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
              <button
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
                className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                ) : (
                  <IoSearch className="text-xl" />
                )}
              </button>

              <button
                onClick={handleRecog}
                className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
              >
                <MdOutlineMicExternalOn className="text-xl" />
              </button>
            </div>
          </div>

          {/* Suggestions */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {["Python", "React", "Machine Learning", "UI/UX", "Data Science"].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-sm text-gray-200 hover:bg-white/20 hover:border-orange-400 transition-all duration-300"
                >
                  {suggestion}
                </button>
              )
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="w-full max-w-6xl mb-10 bg-gradient-to-br from-[#1E2A3C] to-[#162030] p-4 rounded-xl text-white mt-12 px-2 sm:px-4 flex-1">
          {isSearching ? (
            <h1 className="text-center text-xl sm:text-2xl mt-10 ">
              Searching...
            </h1>
          ) : recommendations.length > 0 ? (
            <>
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-white text-center">
                AI Search Results
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((course) => (
                  <Link
                    key={course._id}
                    to={`/course/${course._id}`}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl border border-gray-700 overflow-hidden hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2 group"
                  >
                    <div className="relative overflow-hidden">
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
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-900/30 text-orange-400 border border-orange-500/30">
                        {course.category}
                      </span>

                      <h3 className="text-xl font-semibold text-white mt-2 mb-2 group-hover:text-orange-400 transition-colors">
                        {course.title}
                      </h3>

                      {course.subTitle && (
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {course.subTitle}
                        </p>
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
                      <span className="text-gray-500 line-through mr-2">₹{(course.price) + 1000}</span>
                      <span className="text-red-500">₹{course.price}</span>
                    </div>
                      ) : (
                        <div className="mt-4 text-xl font-bold text-green-500">
                          Free
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <h1 className="text-center text-xl sm:text-2xl mt-10 text-gray-400">
              No Courses Found
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchWithAI;

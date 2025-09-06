import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeftLong, FaPlay, FaLock } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourse } from "../store/slices/courseSlice";
import { FaStar } from "react-icons/fa6";
import { getLectures } from "../store/actions/lectureActions";

const ViewCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { allCourses, selectedCourse } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);


    useEffect(() => {
      dispatch(getLectures(courseId))
  }, [dispatch, courseId]
)

  // ✅ Pick course directly from allCourses and push to Redux
  useEffect(() => {
    if (allCourses?.length > 0) {
      const foundCourse = allCourses.find((c) => c._id === courseId);

      if (foundCourse) {
        dispatch(setSelectedCourse(foundCourse));
        setLoading(false);
      } else {
        setError("Course not found.");
        setLoading(false);
      }
    }
  }, [courseId, allCourses, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !selectedCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 bg-gray-50 pt-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p>{error || "Course not found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 pt-24 pb-9">
      <FaArrowLeftLong
        className="absolute top-[20%] left-[5%] w-[22px] h-[22px] cursor-pointer text-gray-700 hover:text-gray-900 transition"
        onClick={() => navigate(`/courses`)}
      />

      <div className="max-w-6xl mx-auto">
        {/* Course Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative">
            <div
              className="relative h-64 md:h-80 flex items-center justify-center bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedCourse.thumbnail})` }}
            ></div>
          </div>
          <div /> {/* dark overlay only */}
          <div className="relative text-center text-gray-900 pt-14 px-6 font-[f4]">
            {/* Course Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              {selectedCourse.title}
            </h1>

            {/* Instructor Info */}
            {selectedCourse?.creator?.name && (
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="relative group">
                  <img
                    src={
                      selectedCourse?.creator?.imageUrl || "/default-avatar.png"
                    }
                    alt={selectedCourse?.creator?.name}
                    className="w-14 h-14 rounded-full border-2 border-purple-400 shadow-md object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute -bottom-1 right-0 bg-green-500 w-3 h-3 rounded-full border border-white"></span>
                </div>
                <span className="text-2xl font-bold font-[f1] text-gray-800 group-hover:text-purple-600 transition">
                  By {selectedCourse.creator.name}
                </span>
              </div>
            )}

            {/* Subtitle */}
            {selectedCourse.subTitle && (
              <div className="relative max-w-2xl mx-auto">
                <h2 className="text-xl md:text-2xl text-gray-600 italic">
                  {selectedCourse.subTitle}
                </h2>
                <div className="h-[2px] w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-3 rounded-full"></div>
              </div>
            )}
          </div>
          <div className="p-8 font-[f2]">
            <div className="flex flex-wrap gap-4 mb-6 font-[f1]">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
                {selectedCourse.category}
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                {selectedCourse.level}
              </span>
            </div>

            {/* Price Section */}
            <div className="mb-6 font-[f4]">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                {/* Discounted + Original Price */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-red-600">
                      ₹{selectedCourse.price}
                    </span>
                    <span className="text-gray-500 line-through text-lg">
                      ₹{selectedCourse.price + 1000}
                    </span>
                  </div>
                  <span className="text-green-600 font-medium text-sm">
                    Limited time offer!
                  </span>
                </div>

                {/* Discount Badge */}
                <span className="bg-yellow-200 text-yellow-800 px-3 text-center py-1 rounded-full font-semibold text-sm shadow-sm">
                  Save{" "}
                  {Math.round((1000 / (selectedCourse.price + 1000)) * 100)}%
                </span>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6 font-[f1]">
              {selectedCourse.description}
            </p>

            {!isEnrolled ? (
              <button
                className="animate-bounce cursor-pointer flex-1 bg-gradient-to-r from-orange-700 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-orange-700 transition transform "
                // onClick={() => navigate(`/enrolled-courses`)}
              >
                Enroll Now
              </button>
            ) : (
              <button
                className="cursor-pointer bg-green-600 text-white px-6 py-2 rounded hover:scale-105 mt-3"
                onClick={() => navigate(`/viewlecture/${courseId}`)}
              >
                Watch Now
              </button>
            )}
          </div>
        </div>

        {/* Lectures Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col  sm:flex-row items-center justify-between">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">
              Course Content
            </h3>
            {/* Create Lecture Button (only show if user is creator) */}
            {userData?.role === "educator" && userData?._id === selectedCourse.creator._id && (
              <div className="flex justify-end mb-4 ">
                <button
                  onClick={() =>
                    navigate(`/courses/${courseId}/create-lecture`)
                  }
                  className="cursor-pointer bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
                >
                  Manage Lectures
                </button>
              </div>
            )}
          </div>
          {selectedCourse.lectures?.length > 0 ? (
            <div className="space-y-4">
              {selectedCourse.lectures.map((lecture, index) => (
                <div
                  key={lecture._id}
                  className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition group"
                  onClick={() => navigate(`/view-lecture/${courseId}`)}
                >
                  <div className="flex-shrink-0 mr-4">
                    {lecture.isPreviewFree ? (
                      <FaPlay className="text-green-600 w-6 h-6" />
                    ) : (
                      <FaLock className="text-gray-400 w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                      {index + 1}. {lecture.title}
                    </h4>
                    {lecture.isPreviewFree && (
                      <span className="text-green-600 text-sm font-medium">
                        Free Preview
                      </span>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-gray-500 text-sm">
                      Lecture {index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No lectures available for this course yet.
              </p>
            </div>
          )}
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  // onClick={() => setRating(star)} className={star <= rating ? "fill-yellow-500" : "fill-gray-300"}
                />
              ))}
            </div>
            <textarea
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              className="w-full border border-gray-300 rounded-lg p-2"
              rows="3"
            />
            <button
              className="bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800"
              // onClick={handleReview}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;

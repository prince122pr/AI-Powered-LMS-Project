import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeftLong, FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourse } from "../store/slices/courseSlice";
import { getLectures } from "../store/actions/lectureActions";
import axios from "axios";
import { backendBaseURL } from "../App";
import { toast } from "react-toastify";
import { currentUser } from "../store/actions/userActions";
import profImg from "../assets/Some_Images/avatar-image.webp";
import { createCourseReview, getCourseReviews } from "../store/actions/reviewActions";

const ViewCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allCourses, selectedCourse, creatorCourseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const reviews = useSelector((state) => state.reviews?.reviews || []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // ✅ Check if user is enrolled
  const checkEnrolledCourse = () => {
    if (!userData) return;
    const enrolled = userData.enrolledCourses?.some((c) => c._id.toString() === courseId.toString());
    setIsEnrolled(enrolled || false);
  };

  // ✅ Fetch course data from allCourses or backend
  const fetchCourse = async () => {
    try {
      let course = allCourses?.find((c) => c._id === courseId);
      if (!course) {
        const { data } = await axios.get(`${backendBaseURL}/course/${courseId}`, { withCredentials: true });
        course = data.course;
      }
      if (course) {
        dispatch(setSelectedCourse(course));
      } else {
        setError("Course not found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch course.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkEnrolledCourse();
    fetchCourse();
    dispatch(getLectures(courseId));
    dispatch(getCourseReviews(courseId));
  }, [courseId, userData, dispatch]);

  // ✅ Handle enrollment payment
  const handleEnroll = async (userId, courseId) => {
    try {
      const res = await axios.post(`${backendBaseURL}/order/create-order`, { courseId }, { withCredentials: true });
      const data = res.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "EdGine",
        description: "COURSE ENROLLMENT PAYMENT",
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyPayment = await axios.post(
              `${backendBaseURL}/order/verify-payment`,
              { ...response, courseId, userId },
              { withCredentials: true }
            );
            await dispatch(currentUser());
            setIsEnrolled(true);
            toast.success(`Payment Verified: ${verifyPayment.data.message}`);
          } catch (err) {
            toast.error(err.response?.data?.message || "Payment verification failed.");
          }
        },
        theme: { color: "#3399cc" },
        method: { upi: true, card: true, netbanking: true, wallet: true },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment init error:", err);
      toast.error("Failed to initiate payment.");
    }
  };

  const handleReview = ({ courseId, rating, comment }) => {
    if (!rating) return toast.error("Please give a rating!");
    dispatch(createCourseReview({ courseId, rating, comment }));
    setComment("");
    setRating(0);
  };

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

  const freePreviewLecture = selectedCourse.lectures?.find((lec) => lec.isPreviewFree);

  return (
    <div className="min-h-screen px-4 pt-24 pb-9">
      

      <div className="max-w-6xl mx-auto">
        <FaArrowLeftLong
              className="absolute top-20 left-5 w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600 transition"
              onClick={() => navigate("/")}
            />
      
        {/* Course Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div
            className="relative h-64 md:h-80 flex items-center justify-center bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${selectedCourse.thumbnail})` }}
          ></div>

          <div className="relative text-center text-gray-900 pt-14 px-6 font-[f4]">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              {selectedCourse.title}
            </h1>

            {selectedCourse?.creator?.name && (
              <div className="flex items-center justify-center gap-4 mb-6">
                <img
                  src={selectedCourse?.creator?.imageUrl || profImg}
                  alt={selectedCourse?.creator?.name}
                  className="w-14 h-14 rounded-full border-2 border-purple-400 shadow-md object-cover"
                />
                <span className="text-2xl font-bold font-[f1] text-gray-800">
                  By {selectedCourse.creator.name}
                </span>
              </div>
            )}

            {selectedCourse.subTitle && (
              <div className="relative max-w-2xl mx-auto">
                <h2 className="text-xl md:text-2xl text-gray-600 italic">{selectedCourse.subTitle}</h2>
                <div className="h-[2px] w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-3 rounded-full"></div>
              </div>
            )}
          </div>

          <div className="p-8 font-[f2]">
            <div className="flex flex-wrap gap-4 mb-6 font-[f1]">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">{selectedCourse.category}</span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">{selectedCourse.level}</span>
            </div>

            {/* Price Section */}
            <div className="mb-6 font-[f4]">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-red-600">₹{selectedCourse.price}</span>
                    <span className="text-gray-500 line-through text-lg">₹{selectedCourse.price + 1000}</span>
                  </div>
                  <span className="text-green-600 font-medium text-sm">Limited time offer!</span>
                </div>

                <span className="bg-yellow-200 text-yellow-800 px-3 text-center py-1 rounded-full font-semibold text-sm shadow-sm">
                  Save {Math.round((1000 / (selectedCourse.price + 1000)) * 100)}%
                </span>
              </div>
            </div>

            {isEnrolled || creatorCourseData.some((c) => c._id === courseId) ? (
              <button
                className="cursor-pointer bg-green-600 text-white px-6 py-2 rounded hover:scale-105 mt-3"
                onClick={() => navigate(`/view-lecture/${courseId}`)}
              >
                Watch Now
              </button>
            ) : (
              <button
                className="animate-bounce cursor-pointer flex-1 bg-gradient-to-r from-orange-700 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-orange-700 transition transform"
                onClick={() => handleEnroll(userData?._id, courseId)}
              >
                Enroll Now
              </button>
            )}
          </div>
        </div>

        {/* Free Preview */}
        {freePreviewLecture && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Free Preview</h2>
            <h3 className="text-lg font-medium text-gray-700 mb-3">{freePreviewLecture.title}</h3>
            <video src={freePreviewLecture.videoURL} controls className="w-full rounded-lg border border-gray-300" />
          </div>
        )}

        {/* Review Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {[0, 1, 2, 3, 4].map((val) => {
                const starValue = val + 1;
                return (
                  <FaStar
                    key={starValue}
                    onClick={() => setRating(starValue)}
                    className={`cursor-pointer ${starValue <= rating ? "text-yellow-400" : "text-gray-400"}`}
                  />
                );
              })}
            </div>
            <textarea
              placeholder="Write your comment here..."
              className="w-full border border-gray-300 rounded-lg p-2"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={() => handleReview({ courseId, rating, comment })} className="bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800">
              Submit Review
            </button>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">All Reviews</h3>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((rev, idx) => (
                    <div key={idx} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                      <div className="flex items-center gap-3 mb-2">
                        <img src={rev.user?.imageUrl || profImg} alt={rev.user?.name} className="w-10 h-10 rounded-full object-cover border" />
                        <div>
                          <p className="font-semibold text-gray-800">{rev.user?.name}</p>
                          <div className="flex gap-1 text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <FaStar key={i} className={i < rev.rating ? "text-yellow-400" : "text-gray-300"} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{rev.comment}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(rev.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;

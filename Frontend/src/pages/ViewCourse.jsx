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

const ViewCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { allCourses, selectedCourse } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const checkEnrolledCourse = () => {
    const verify = userData?.enrolledCourses?.some(
      (c) => c._id.toString() === courseId.toString()
    );
    
    if (verify) setIsEnrolled(true);
  };

  useEffect(() => {
    dispatch(getLectures(courseId));
    checkEnrolledCourse();
  }, [dispatch, courseId, userData]);

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

  const handleEnroll = async (userId, courseId) => {
    try {
      let res = await axios.post(
        `${backendBaseURL}/order/create-order`,
        { courseId },
        { withCredentials: true }
      );

      let data = res.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "EdGine",
        description: "COURSE ENROLLMENT PAYMENT",
        order_id: data.id,
        handler: async function (response) {
          try {
            const verifyPayment = await axios.post(
              backendBaseURL + "/order/verify-payment",
              { ...response, courseId, userId },
              { withCredentials: true }
            );

            await dispatch(currentUser());
            setIsEnrolled(true);

            toast.success(`Verify Payment: ${verifyPayment.data.message}`);
          } catch (error) {
            toast.error(error.response.data.message);
          }
        },
        methods: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment init error:", error);
    }
  };

  // ✅ Free Preview Lecture
  const freePreviewLecture = selectedCourse.lectures?.find(
    (lec) => lec.isPreviewFree
  );


  return (
    <div className="min-h-screen px-4 pt-24 pb-9">
      <FaArrowLeftLong
        className="absolute top-[20%] left-[5%] w-[22px] h-[22px] cursor-pointer text-gray-700 hover:text-gray-900 transition"
        onClick={() => navigate(`/courses`)}
      />

      <div className="max-w-6xl mx-auto">
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
                  src={
                    selectedCourse?.creator?.imageUrl || "/default-avatar.png"
                  }
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
                onClick={() => handleEnroll(userData._id, courseId)}
              >
                Enroll Now
              </button>
            ) : (
              <button
                className="cursor-pointer bg-green-600 text-white px-6 py-2 rounded hover:scale-105 mt-3"
                onClick={() => navigate(`/view-lecture/${courseId}`)}
              >
                Watch Now
              </button>
            )}
          </div>
        </div>

        {/* ✅ Free Preview Section */}
        {freePreviewLecture && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Free Preview
            </h2>
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              {freePreviewLecture.title}
            </h3>
            <video
              src={freePreviewLecture.videoURL}
              controls
              className="w-full rounded-lg border border-gray-300"
            />
          </div>
        )}

        {/* Review Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} />
              ))}
            </div>
            <textarea
              placeholder="Write your comment here..."
              className="w-full border border-gray-300 rounded-lg p-2"
              rows="3"
            />
            <button className="bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800">
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlayCircle, FaLock } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

function ViewLecture() {
  const { courseId } = useParams();
  const { allCourses } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.user);

  const selectedCourse = allCourses?.find((course) => course._id === courseId);
  const navigate = useNavigate();

  // ✅ Assume enrollment check (replace with your backend/API logic)
  const [isEnrolled, setIsEnrolled] = useState(false);

  const [selectedLecture, setSelectedLecture] = useState(null);

  useEffect(() => {
    if (selectedCourse?.lectures?.length > 0) {
      // Default: if enrolled → first lecture, else first free preview
      const defaultLecture = isEnrolled
        ? selectedCourse.lectures[0]
        : selectedCourse.lectures.find((lec) => lec.isPreviewFree);

      setSelectedLecture(defaultLecture || null);
    }
  }, [selectedCourse, isEnrolled]);

  const courseCreator =
    user?._id === selectedCourse?.creator ? user : null;

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20 flex flex-col md:flex-row gap-6">
      {/* Left - Video & Course Info */}
      <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        {/* Course Details */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-5 text-gray-800">
            <FaArrowLeftLong
              className="text-black w-6 h-6 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            {selectedCourse?.title}
          </h1>

          <div className="mt-2 flex gap-4 text-sm text-gray-500 font-medium">
            <span>Category: {selectedCourse?.category}</span>
            <span>Level: {selectedCourse?.level}</span>
          </div>
        </div>

        {/* Video Player */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4 border border-gray-300">
          {selectedLecture?.videoURL ? (
            <video
              src={selectedLecture.videoURL}
              controls
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white text-center px-4">
              {isEnrolled
                ? "Select a lecture to start watching"
                : "Enroll in this course to watch full lectures. Free previews are available."}
            </div>
          )}
        </div>

        {/* Selected Lecture Info */}
        <div className="mt-2">
          <h2 className="text-lg font-semibold text-gray-800">
            {selectedLecture?.title}
          </h2>
          {!isEnrolled && selectedLecture && !selectedLecture.isPreviewFree && (
            <p className="text-red-500 text-sm mt-1">
              This lecture is locked. Enroll to access full content.
            </p>
          )}
        </div>
      </div>

      {/* Right - All Lectures + Creator Info */}
      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-fit">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          All Lectures
        </h2>
        <div className="flex flex-col gap-3 mb-6">
          {selectedCourse?.lectures?.length > 0 ? (
            selectedCourse.lectures.map((lecture, index) => {
              const locked = !isEnrolled && !lecture.isPreviewFree;
              return (
                <button
                  key={lecture._id || index}
                  onClick={() =>
                    !locked && setSelectedLecture(lecture)
                  }
                  disabled={locked}
                  className={`flex items-center justify-between p-3 rounded-lg border transition text-left ${
                    selectedLecture?._id === lecture._id
                      ? "bg-gray-200 border-gray-500"
                      : "hover:bg-gray-50 border-gray-300"
                  } ${locked ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">
                      {index + 1}. {lecture.title}
                    </h4>
                    {!isEnrolled && lecture.isPreviewFree && (
                      <span className="text-green-600 text-xs font-medium">
                        Free Preview
                      </span>
                    )}
                  </div>
                  {locked ? (
                    <FaLock className="text-gray-500 text-lg" />
                  ) : (
                    <FaPlayCircle className="text-black text-lg" />
                  )}
                </button>
              );
            })
          ) : (
            <p className="text-gray-500">No lectures available.</p>
          )}
        </div>

        {/* Creator Info */}
        {courseCreator && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-3">
              Instructor
            </h3>
            <div className="flex items-center gap-4">
              <img
                src={courseCreator.imageURL || "/default-avatar.png"}
                alt="Instructor"
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-base font-medium text-gray-800">
                  {courseCreator.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {courseCreator.description || "No bio available."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewLecture;

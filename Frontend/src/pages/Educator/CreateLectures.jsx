import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { backendBaseURL } from "../../App";
import { useDispatch, useSelector } from "react-redux";

import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { setLectures } from "../../store/slices/lectureSlice";
import { deleteLecture, getLectures } from "../../store/actions/lectureActions";

function CreateLectures() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lectures} = useSelector((state) => state.lectures);

  const [lectureTitle, setLectureTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [loading, setLoading] = useState(false);

   // ✅ Fetch lectures on first render or when courseId changes
  useEffect(() => {
    if (courseId) {
      dispatch(getLectures(courseId));
    }
  }, [courseId, dispatch]);

  // Create Lecture Handler
  const createLectureHandler = async () => {
    if (!lectureTitle) return toast.error("Please enter lecture title");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", lectureTitle);
      formData.append("isPreviewFree", isPreviewFree);
      if (videoFile) formData.append("videoURL", videoFile);

      const result = await axios.post(
        `${backendBaseURL}/course/create-lecture/${courseId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      )
      // console.log(result.data);
      

      dispatch(setLectures([...lectures, result.data.lecture]));
      toast.success("Lecture Created");

      setLectureTitle("");
      setVideoFile(null);
      setIsPreviewFree(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

 const handleDelete = async (lectureId, courseId) => {
    try {
      if(window.confirm("Are you sure you want to delete this lecture?")){
        const res = await dispatch(deleteLecture(lectureId, courseId));
        if(res) {
          toast.success("Lecture Deleted");
        }
        // console.log(res);
        
      }
      return;

    } catch (error) {
      console.log(error);
    }
 }

  return (
    <div className="min-h-screen bg-[#12192A] flex items-center justify-center p-4">
      <div className="bg-gray-800 border-2 text-white border-white shadow-xl rounded-xl w-full max-w-2xl p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold mb-1 font-[f4]">
            Add a Lecture
          </h1>
          <p className="text-lg text-gray-100">
            Enter the title, upload video and manage your lectures.
          </p>
        </div>

        {/* Input Title */}
        <input
          type="text"
          placeholder="e.g. Introduction to MERN Stack"
          className="w-full border border-gray-300 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
        />

        {/* Upload Video */}
        <input
          type="file"
          accept="video/*"
          className="w-full border border-gray-300 rounded-md p-2 text-lg mb-3"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
        <p className="text-xs text-gray-100 mb-4">
          Supported formats: MP4, WebM, etc.
        </p>

        {/* Checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="isPreviewFree"
            checked={isPreviewFree}
            onChange={(e) => setIsPreviewFree(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="isPreviewFree" className="ml-2 text-lg text-gray-100">
            Make this lecture available as a free preview
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-700 cursor-pointer text-lg font-medium"
            onClick={() => navigate(`/course/${courseId}`)}
          >
            <FaArrowLeft /> Back to Lectures
          </button>
          <button
            className="px-5 py-2 rounded-md font-[f3] bg-black text-white cursor-pointer hover:scale-105 transition-all text-sm font-medium shadow"
            onClick={createLectureHandler}
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "+ Create Lecture"}
          </button>
        </div>

        {/* Lecture List */}
        <div className="space-y-2">
          {lectures?.map((lecture, index) => (
            <div
              key={lecture._id || index}
              className="bg-gray-100 rounded-md flex justify-between items-center p-3 text-sm font-medium text-gray-700"
            >
              <span>
                Lecture {index + 1}: {lecture.title}
              </span>
              <div className="flex gap-4 items-center">
              <MdDelete onClick={() => handleDelete(lecture._id, courseId)} className="text-gray-500 text-lg hover:text-blue-600 cursor-pointer"/>
              <FaEdit 
                className="text-gray-500 text-[15px] hover:text-blue-600 cursor-pointer"
                onClick={() =>
                  navigate(`/courses/${courseId}/edit-lecture/${lecture._id}`)
                }
              />
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateLectures;

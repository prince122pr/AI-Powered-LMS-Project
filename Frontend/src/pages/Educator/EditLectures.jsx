import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateLecture } from '../../store/actions/lectureActions';


const EditLectures = () => {
  const { lectureId, courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  // Get lectures from Redux store
  // const lectures = useSelector(state => state.lectures.lectures);
  
  const [formData, setFormData] = useState({
    title: '',
    isPreviewFree: false,
    videoURL: null
  });
  
  const [currentVideoURL, setCurrentVideoURL] = useState('');
  const [loading, setLoading] = useState(false);
  // const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  

  
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Create FormData object for file upload
      const lectureFormData = new FormData();
      lectureFormData.append('title', formData.title);
      lectureFormData.append('isPreviewFree', formData.isPreviewFree);
      
      if (formData.videoURL) {
        lectureFormData.append('videoURL', formData.videoURL);
      }
      
      
      setSuccess('Lecture updated successfully!');

      dispatch(updateLecture(lectureId, lectureFormData));


      // Redirect to course edit page after successful update
      navigate(`/courses/:${courseId}/edit-lecture/:${lectureId}`)
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update lecture. Please try again.');
      console.error('Error updating lecture:', err);
    } finally {
      setLoading(false);
    }
  };
  

  
  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold mb-6">Edit Lecture</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Lecture Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="videoURL" className="block text-sm font-medium text-gray-700 mb-1">
            Lecture Video
          </label>
          {currentVideoURL && (
            <div className="mb-2">
              <p className="text-sm text-gray-600">Current video: {currentVideoURL}</p>
              <p className="text-xs text-gray-500">Upload a new video to replace the current one</p>
            </div>
          )}
          <input
            type="file"
            id="videoURL"
            name="videoURL"
            accept="video/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Upload your lecture video file. Supported formats: MP4, WebM, etc.
          </p>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPreviewFree"
            name="isPreviewFree"
            checked={formData.isPreviewFree}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isPreviewFree" className="ml-2 block text-sm text-gray-700">
            Make this lecture available as a free preview
          </label>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/course/${courseId}`)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Updating...' : 'Update Lecture'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLectures;
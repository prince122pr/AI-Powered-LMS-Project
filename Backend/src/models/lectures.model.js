import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    videoURL: {
        type: String,
},
    isPreviewFree:{
        type: Boolean,
        default: false,
    },
     courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // reference to Course model
      required: true,
    },
  }, {timestamps: true});

const lectureModel = mongoose.model("Lecture", lectureSchema);

export default lectureModel;
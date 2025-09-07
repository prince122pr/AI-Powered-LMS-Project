import mongooose from "mongoose";

const courseSchema = new mongooose.Schema({
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
},
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
    },
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    enrolledStudents: [{
        type: mongooose.Schema.Types.ObjectId,
        ref: "User",    
    }],
    lectures: [{
        type: mongooose.Schema.Types.ObjectId,
        ref: "Lecture",
    }]
    ,
    creator: {
        type: mongooose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isPublished:{
        type: Boolean,
        default: false,
    },
    reviews:[{
        type: mongooose.Schema.Types.ObjectId,
        ref: "Review",
    }]
  }, {timestamps: true});

const courseModel = mongooose.model("Course", courseSchema);

export default courseModel;
import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required:  true,
    },
    email: {
        type: String,
        required:  true,
        unique: true
    },
    password: {
        type: String,
        required:  true,
    },
    role: {
        type: String,
        enum: ["student", "educator"],
        required:  true,
    },
    imageUrl: {
        type: String,
        default: ""
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]

},{timestamps: true});

export const userModel = mongoose.model('User', userSchema);
import courseModel from "../models/course.model.js";
import fs from "fs";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuidv4 } from "uuid";
import lectureModel from "../models/lectures.model.js";
import { log } from "console";

// courses
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      category,
      subTitle,
      description,
      level,
      price,
      isPublished,
    } = req.body;

    console.log(req.body);

    if (!title || !category) {
      return res
        .status(400)
        .json({ message: "Title and Category are required" });
    }

    const courseData = {
      creator: req.user._id, // 👈 auto set from logged-in user
    };
    if (title) courseData.title = title;
    if (description) courseData.description = description;
    if (subTitle) courseData.subTitle = subTitle;
    if (category) courseData.category = category;
    if (level) courseData.level = level;
    if (price) courseData.price = price;
    if (typeof isPublished !== "undefined")
      courseData.isPublished = isPublished;

    if (req.file) {
      const fileData = fs.readFileSync(req.file.path); // read file from disk
      // Upload file to ImageKit using buffer
      const uploaded = await uploadFile(fileData, uuidv4());
      fs.unlinkSync(req.file.path); // delete temp file after upload
      courseData.thumbnail = uploaded.url; // save ImageKit URL
    }

    const Course = await courseModel.create(courseData);
    console.log(Course);

    return res.status(201).json({
      message: "Course created successfully",
      Course,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Create course failed. ${error.message}` });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await courseModel
      .find({ isPublished: true })
      .populate("lectures")   // get full lecture details
      .populate("creator", "name imageUrl"); // getting data about creator only fetch name & image (avoid full user object)

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No published courses found" });
    }

    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Fetching published courses failed. ${error.message}` });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.user._id;
    const courses = await courseModel.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({ message: "No courses found" });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Fetching creator courses failed. ${error.message}` });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      title,
      subTitle,
      description,
      category,
      level,
      price,
      isPublished,
    } = req.body;

    // Prepare update object
    const updateCourseData = {};
    if (title) updateCourseData.title = title;
    if (subTitle) updateCourseData.subTitle = subTitle;
    if (description) updateCourseData.description = description;
    if (category) updateCourseData.category = category;
    if (level) updateCourseData.level = level;
    if (price) updateCourseData.price = price;
    if (typeof isPublished !== "undefined")
      updateCourseData.isPublished = isPublished;

    if (req.file) {
      const fileData = fs.readFileSync(req.file.path); // read file from disk
      // Upload file to ImageKit using buffer
      const uploaded = await uploadFile(fileData, uuidv4());
      fs.unlinkSync(req.file.path); // delete temp file after upload
      updateCourseData.imageUrl = uploaded.url; // save ImageKit URL
    }
    // Update user in database
    const updatedCourse = await courseModel.findByIdAndUpdate(
      courseId,
      updateCourseData,
      { new: true }
    );
    console.log(updatedCourse);
    if (!updatedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    onsole.error("Updating Course Error:", error);
    return res
      .status(500)
      .json({ message: "Updating Course Error!", error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    // Populate the lectures array to get full lecture details
    let course = await courseModel.findById(courseId).populate("lectures");
    if (!course) return res.status(404).json({ message: "Course not found" });
    return res.status(200).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Fetching course by ID failed. ${error.message}` });
  }
};

export const removeCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    let course = await courseModel.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    await courseModel.findByIdAndDelete(courseId, { new: true });
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Deleting course failed. ${error.message}` });
  }
};


// lectures
export const createLecture = async (req, res) => {
  try {
    const { title, isPreviewFree } = req.body;
    const courseId = req.params.courseId;

    if (!title || !courseId) {
      return res
        .status(400)
        .json({ message: "Title and CourseId are required" });
    }

    let lectureData = {};
    if (title) lectureData.title = title;

    if (isPreviewFree !== undefined) lectureData.isPreviewFree = isPreviewFree;

    if (req.file) {
      const fileData = fs.readFileSync(req.file.path); // read file from disk
      // Upload file to ImageKit using buffer
      const uploaded = await uploadFile(fileData, uuidv4());
      fs.unlinkSync(req.file.path); // delete temp file after upload
      lectureData.videoURL = uploaded.url; // save ImageKit URL
    }

    lectureData.courseId = courseId;

    // Create the lecture
    const lecture = await lectureModel.create(lectureData);
    console.log("Created lecture:", lecture);

    // Add the lecture to the course's lectures array
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.lectures.push(lecture._id);
    await course.save();
    console.log("Updated course with new lecture:", course);

    return res.status(201).json({
      message: "Lecture created successfully",
      lecture,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Creating Lecture Error!", error: error.message });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    // console.log("Fetching lectures for courseId:", courseId);
    

    // Find all lectures for the course and populate course details
    const lectures = await lectureModel.find({ courseId }).populate("courseId");
    // console.log("Found lectures:", lectures);
    

    if (!lectures || lectures.length === 0) {
      return res.status(404).json({ message: "No lectures found" });
    }

    return res.status(200).json({
      message: "Lectures fetched successfully",
      lectures,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Fetching Course Lectures Error!",
      error: error.message,
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const lectureId = req.params.lectureId;
    const { title, isPreviewFree } = req.body;

    // Find the lecture first
    const lecture = await lectureModel.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // Update title if provided
    if (title) lecture.title = title;

    // Update isPreviewFree if provided, else keep default (from schema)
    if (isPreviewFree !== undefined) {
      lecture.isPreviewFree =
        isPreviewFree === true || isPreviewFree === "true";
    }

    // Handle new video file upload if provided
    if (req.file) {
      const fileData = fs.readFileSync(req.file.path);
      const uploaded = await uploadFile(fileData, uuidv4());
      fs.unlinkSync(req.file.path);
      lecture.videoURL = uploaded.url;
    }

    // Save updated lecture
    await lecture.save();

    // Populate course info before sending response
    await lecture.populate("courseId");

    return res.status(200).json({
      message: "Lecture updated successfully",
      lecture,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Editing Lecture Error!",
      error: error.message,
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const lectureId = req.params.lectureId;

    // Find the lecture first
    const lecture = await lectureModel.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // Get the courseId before removing the lecture
    const courseId = lecture.courseId;

    // Remove the lecture from the course's lectures array
    if (courseId) {
      const course = await courseModel.findById(courseId);
      if (course) {
        course.lectures = course.lectures.filter(
          (id) => id.toString() !== lectureId
        );
        await course.save();
        console.log("Updated course after removing lecture:", course);
      }
    }

    // Optional: Delete video from ImageKit or local storage if needed

    // Remove lecture from DB
    await lecture.remove();

    return res.status(200).json({
      message: "Lecture removed successfully",
      lectureId, // return the removed lecture ID for frontend reference
    });
  } catch (error) {
    return res.status(500).json({
      message: "Removing Lecture Error!",
      error: error.message,
    });
  }
};

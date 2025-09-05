import courseModel from "../models/course.model.js";
import fs from "fs";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuidv4 } from "uuid";

export const createCourse = async (req, res) => {
  try {
    const { title, category, subTitle, description, level, price, isPublished } = req.body;

    console.log(req.body);

    if (!title || !category) {
      return res.status(400).json({ message: "Title and Category are required" });
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
    if (typeof isPublished !== "undefined") courseData.isPublished = isPublished;

      if (req.file) {
            const fileData = fs.readFileSync(req.file.path); // read file from disk
          // Upload file to ImageKit using buffer
          const uploaded = await uploadFile(fileData, uuidv4());
           fs.unlinkSync(req.file.path); // delete temp file after upload
          courseData.thumbnail = uploaded.url; // save ImageKit URL
        }

        const Course = await courseModel.create(
        courseData
      );
      console.log(Course);

    return res.status(201).json({
      message: "Course created successfully",
      Course,
    });
  } catch (error) {
    return res.status(500).json({ message: `Create course failed. ${error.message}` });
  }
};


export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({ isPublished: true });
    if (!courses) {
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
      return res.status(404).json({ success: false, message: "Course not found" });
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
    let course = await courseModel.findById(courseId);
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

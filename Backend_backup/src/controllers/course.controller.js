import courseModel from "../models/course.model.js";
import lectureModel from "../models/lectures.model.js";
import fs from "fs";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuidv4 } from "uuid";

// ===================== COURSES =====================

export const createCourse = async (req, res) => {
  try {
    const { title, category, subTitle, description, level, price, isPublished } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: "Title and Category are required" });
    }

    const courseData = { creator: req.user._id };
    if (title) courseData.title = title;
    if (description) courseData.description = description;
    if (subTitle) courseData.subTitle = subTitle;
    if (category) courseData.category = category;
    if (level) courseData.level = level;
    if (price) courseData.price = price;
    if (typeof isPublished !== "undefined") courseData.isPublished = isPublished;

    if (req.file) {
      const fileData = fs.readFileSync(req.file.path);
      const uploaded = await uploadFile(fileData, uuidv4());
      console.log(uploaded);
      
      fs.unlinkSync(req.file.path);
      courseData.thumbnail = uploaded.url;
    }

    const Course = await courseModel.create(courseData);
    return res.status(201).json({ message: "Course created successfully", Course });
  } catch (error) {
    return res.status(500).json({ message: `Create course failed. ${error.message}` });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await courseModel
      .find({ isPublished: true })
      .populate("lectures")
      .populate("creator", "name imageUrl");

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No published courses found" });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: `Fetching published courses failed. ${error.message}` });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.user._id;
    const courses = await courseModel.find({ creator: userId });
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: `Fetching creator courses failed. ${error.message}` });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { title, subTitle, description, category, level, price, isPublished } = req.body;

    const updateCourseData = {};
    if (title) updateCourseData.title = title;
    if (subTitle) updateCourseData.subTitle = subTitle;
    if (description) updateCourseData.description = description;
    if (category) updateCourseData.category = category;
    if (level) updateCourseData.level = level;
    if (price) updateCourseData.price = price;
    if (typeof isPublished !== "undefined") updateCourseData.isPublished = isPublished;

    if (req.file) {
      const fileData = fs.readFileSync(req.file.path);
      const uploaded = await uploadFile(fileData, uuidv4());
      fs.unlinkSync(req.file.path);
      updateCourseData.thumbnail = uploaded.url;
    }

    const updatedCourse = await courseModel.findByIdAndUpdate(courseId, updateCourseData, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    return res.status(200).json({ success: true, message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    console.error("Updating Course Error:", error);
    return res.status(500).json({ message: "Updating Course Error!", error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await courseModel.findById(courseId).populate("lectures");
    if (!course) return res.status(404).json({ message: "Course not found" });
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: `Fetching course by ID failed. ${error.message}` });
  }
};

export const removeCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await courseModel.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    await courseModel.findByIdAndDelete(courseId);
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Deleting course failed. ${error.message}` });
  }
};

// ===================== LECTURES =====================

export const createLecture = async (req, res) => {
  try {
    const { title, isPreviewFree } = req.body;
    const courseId = req.params.courseId;

    if (!title || !courseId) return res.status(400).json({ message: "Title and CourseId are required" });

    const lectureData = { title };
    if (isPreviewFree !== undefined) lectureData.isPreviewFree = isPreviewFree;

    if (req.file) {
      const fileData = fs.readFileSync(req.file.path);
      const uploaded = await uploadFile(fileData, uuidv4());
      fs.unlinkSync(req.file.path);
      lectureData.videoURL = uploaded.url;
    }

    lectureData.courseId = courseId;
    const lecture = await lectureModel.create(lectureData);

    const course = await courseModel.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.lectures.push(lecture._id);
    await course.save();

    return res.status(201).json({ message: "Lecture created successfully", lecture });
  } catch (error) {
    return res.status(500).json({ message: "Creating Lecture Error!", error: error.message });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const lectures = await lectureModel.find({ courseId }).populate("courseId");

    if (!lectures || lectures.length === 0) return res.status(404).json({ message: "No lectures found" });

    return res.status(200).json({ message: "Lectures fetched successfully", lectures });
  } catch (error) {
    return res.status(500).json({ message: "Fetching Course Lectures Error!", error: error.message });
  }
};

export const editLecture = async (req, res) => {
  try {
    const lectureId = req.params.lectureId;
    const { title, isPreviewFree } = req.body;

    const lecture = await lectureModel.findById(lectureId);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });

    if (title) lecture.title = title;
    if (isPreviewFree !== undefined) lecture.isPreviewFree = isPreviewFree === true || isPreviewFree === "true";

    if (req.file) {
      const fileData = fs.readFileSync(req.file.path);
      const uploaded = await uploadFile(fileData, uuidv4());
      fs.unlinkSync(req.file.path);
      lecture.videoURL = uploaded.url;
    }

    await lecture.save();
    await lecture.populate("courseId");

    return res.status(200).json({ message: "Lecture updated successfully", lecture });
  } catch (error) {
    return res.status(500).json({ message: "Editing Lecture Error!", error: error.message });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const lectureId = req.params.lectureId;
    const lecture = await lectureModel.findById(lectureId);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });

    const courseId = lecture.courseId;
    if (courseId) {
      const course = await courseModel.findById(courseId);
      if (course) {
        course.lectures = course.lectures.filter(id => id.toString() !== lectureId);
        await course.save();
      }
    }

    await lecture.deleteOne();
    return res.status(200).json({ message: "Lecture removed successfully", lectureId });
  } catch (error) {
    return res.status(500).json({ message: "Removing Lecture Error!", error: error.message });
  }
};

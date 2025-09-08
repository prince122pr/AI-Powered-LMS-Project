import { userModel } from "../models/user.model.js";
import { uploadFile } from "../services/storage.service.js";
import {v4 as uuidv4} from 'uuid';
import fs from "fs";


export const getCurrentUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id)
      .select("-password")
       .populate("enrolledCourses"); 

    if (!user) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Getting User Error!",
      error,
    });
  }
};



export const updateUser = async (req, res) => {
  try {
    const user = req.user; // from isAuth middleware
    // console.log("User from isAuth:", user);
    
    if (!user) return res.status(404).json({ message: "User Not Found!" });

    const { name, description } = req.body;
    // console.log(name, description);

    // Prepare update object
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    // console.log(updateData);
    
    // Handle profile picture upload
    if (req.file) {
        const fileData = fs.readFileSync(req.file.path); // read file from disk
      // Upload file to ImageKit using buffer
      const uploaded = await uploadFile(fileData, uuidv4());
       fs.unlinkSync(req.file.path); // delete temp file after upload
      updateData.imageUrl = uploaded.url; // save ImageKit URL
    }

    // Update user in database
    const updatedUser = await userModel.findByIdAndUpdate(user._id, updateData, { new: true });
    // console.log(updatedUser);
    

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Updating User Error:", error);
    return res.status(500).json({ message: "Updating User Error!", error: error.message });
  }
};

import courseModel from "../models/course.model.js";
import { genResponse } from "../services/ai.service.js";

export const searchWithAI = async (req, res) => {
  try {
    const { input } = req.query;
    console.log(input);
    

    const prompt = `You are an intelligent assistant for the Edine LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return only one most relevant keyword from the following course categories and levels:

App Development

Web Development

AI/ML

AI Tools

Data Science

Data Analytics

Ethical Hacking

UI/UX

Marketing

Programming

Others

Beginner

Intermediate

Advanced

Instructions:
Only reply with one single keyword from the list above that best matches the query.
Do not add any explanation or extra text.

    Query: ${input}`;

    const result = await genResponse(prompt);
    // console.log(result);


    if (!result)
      return res.status(400).json({ message: "Search query is required!" });
    const course = await courseModel.find({
      isPublished: true,
      $or: [
        { title: { $regex: result, $options: "i" } },
        { subTitle: { $regex: result, $options: "i" } },
        { description: { $regex: result, $options: "i" } },
        { category: { $regex: result, $options: "i" } },
        { level: { $regex: result, $options: "i" } },
      ],
    });
    // console.log(course);
    
    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: `Failed to search: ${error}` });
  }
};

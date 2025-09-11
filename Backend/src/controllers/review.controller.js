import courseModel from "../models/course.model.js";
import reviewModel from "../models/review.model.js";

export const createReview = async (req, res) => {
    try {
        const {rating, comment, courseId} = req.body

        const userId = req.user._id;
        const course = await courseModel.findById(courseId);
        if(!course) return res.status(400).json({message: "Course is not found"})
        const alreadyReviewed = await reviewModel.findOne({course: courseId, user: userId})
    if(alreadyReviewed) return res.status(400).json({message:"You have already reviewed this course!"});    

    const review = await reviewModel.create({
        course: courseId,
        user: userId,
        rating,
        comment
    })
    console.log(review);
    await review.save();
    await course.reviews.push(review._id);
    await course.save();
    return res.status(201).json({message: "Review created successfully!"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed to create review! "})
    }
}

export const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Fetch reviews for the given course
    const reviews = await reviewModel.find({ course: courseId }).populate("user");
    console.log(reviews);
    

    if (!reviews || reviews.length < 1) {
      return res.status(200).json({ message: "No reviews found!", reviews: [] });
    }

    // Send back the reviews array
    return res.status(200).json({
      message: "Course reviews fetched successfully!",
      reviews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch reviews!", error });
  }
};


export const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find({})
      .populate("user", "name photoUrl role") // Populate user name & photo
      .sort({ reviewedAt: -1 }); // Optional: latest first

    return res.status(200).json(
      reviews
    );
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
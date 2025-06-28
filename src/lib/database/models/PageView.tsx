import mongoose from "mongoose";

const pageViewSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    index: true, // Index for faster queries on blogPostId
    required: false, // Not required for non-blog post pages (e.g., homepage, contact)
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true, // ✨ CRUCIAL for time-based queries (e.g., last week, last month)
  },
});

// Ensure the model is not re-registered in development mode
const PageView =
  mongoose.models.PageView || mongoose.model("PageView", pageViewSchema);
export default PageView;

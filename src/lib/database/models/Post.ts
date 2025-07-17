import { Schema, models, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true,
      trim: true,
      index: true,
    },
    excerpt: String,
    content: String,
    imageSrc: String,
    // fileName: String,
    attachments: { type: [String], default: [] },
    youtubeVideoId: String,
    isPublished: {
      type: Boolean,
      default: false,
    },
    // creator: { type: String, required: true, ref: "User" },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;

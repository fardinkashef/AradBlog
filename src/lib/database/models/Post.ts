import { Model } from "mongoose";
import { Schema, models, model } from "mongoose";

// From Mongoose documentation: https://mongoosejs.com/docs/6.x/docs/typescript.html#using-extends-document
// We strongly recommend against using "extends Document" like 'interface IUser extends Document {...}', its support will be dropped in the next major version as it causes major performance issues. Many Mongoose TypeScript codebases use this approach.

// Create an interface representing a document in MongoDB.
export interface IPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  readTime: number; // readTime in minutes
  imageSrc: string;
  attachments: string[];
  youtubeVideoId?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
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
    readTime: Number,
    imageSrc: String,
    attachments: { type: [String], default: [] },
    youtubeVideoId: String,
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Post = (models.Post as Model<IPost>) || model<IPost>("Post", PostSchema);

export default Post;

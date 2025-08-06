"use server";

import { connectToDatabase } from "@/lib/database/db-connection";
import Post from "../database/models/Post";
import { post } from "../types";
import { generateSlug, getReadTime } from "../utils/posts";
// import { revalidatePath } from "next/cache";

export async function getAllPosts() {
  try {
    await connectToDatabase();
    const posts = await Post.find().lean();
    // const p = posts[0]._id;
    // * If you only need to retrieve SOME properties of post objects from DB, this is how you can type the data in TypeScript. Pick<Type, Keys> is a built-in utility type in TypeScript that allows you to create a new type by selecting a set of properties from an existing type.
    // type PostTitleAndDescription = Pick<Post, 'title' | 'description'>;
    return posts;
  } catch (error) {
    // THIS LINE: Logs the error for debugging.
    console.error("This error happened when getting all the posts:", error);
    // THIS LINE: Stops execution and triggers Next.js's error handling.
    // It's the correct user-facing behavior for a server-side failure.
    throw error;
  }
}
export async function getPublishedPosts(): Promise<post[]> {
  try {
    await connectToDatabase();
    const posts = (await Post.find({ isPublished: true }).lean()) as post[];
    if (!posts) {
      throw new Error("There's not any results to return.");
    }
    return posts;
  } catch (error) {
    console.log("This error happened when getting all the posts:", error);
    throw error;
  }
}
export async function getRecentPosts() {
  try {
    await connectToDatabase();
    // Todo: Just return key-value pairs you actually need. For example don't return the content of the post which is a long string.
    const posts = await Post.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
    if (!posts) {
      throw new Error("There's not any results to return.");
    }
    return posts;
  } catch (error) {
    console.log("This error happened when getting recent posts:", error);
    throw error;
  }
}
export async function getPostById(id: string): Promise<post> {
  try {
    await connectToDatabase();
    const post = (await Post.findById(id).lean()) as post;
    if (!post) {
      throw new Error("There's not any results to return.");
    }
    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.log("This error happened when getting the post by its id:", error);
    throw error;
  }
}
export async function getPostBySlug(slug: string): Promise<post> {
  try {
    await connectToDatabase();
    const post = (await Post.findOne({ slug }).lean()) as post;
    if (!post) {
      throw new Error("There's not any results to return.");
    }
    return JSON.parse(JSON.stringify(post));
    // return post;
  } catch (error) {
    console.log("This error happened when getting the post by its id:", error);
    throw error;
  }
}

export async function createPost(title: string): Promise<{
  newPostId: string;
}> {
  try {
    await connectToDatabase();
    const slug = generateSlug(title);
    const newPost = new Post({ title, slug });
    await newPost.save();
    return { newPostId: newPost._id.toString() };
    // revalidatePath("/data");
  } catch (error) {
    console.log("This error happened while creating new data:", error);
    throw error;
  }
}
export async function countPosts() {
  try {
    // 1. Count all posts
    const totalPosts = await Post.countDocuments({});

    // 2. Count published posts
    const publishedPosts = await Post.countDocuments({ isPublished: true });

    // 3. Count draft posts (not published)
    const draftPosts = totalPosts - publishedPosts;
    return { totalPosts, publishedPosts, draftPosts };
  } catch (error) {
    console.log("This error happened while creating new data:", error);
    throw error;
  }
}

//* Updating functions 👇:

export async function updatePostTitle(postSlug: string, newTitle: string) {
  let post;
  try {
    await connectToDatabase();
    post = await Post.findOne({ slug: postSlug });
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!post) {
    const error = new Error("Could not find cPosts for this id.");
    throw error;
  }

  try {
    post.title = newTitle;
    await post.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
}
export async function updatePostExcerpt(postSlug: string, newExcerpt: string) {
  let post;
  try {
    await connectToDatabase();
    post = await Post.findOne({ slug: postSlug });
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!post) {
    const error = new Error("Could not find cPosts for this id.");
    throw error;
  }

  try {
    post.excerpt = newExcerpt;
    await post.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
}
export async function updatePostContent(postSlug: string, newContent: string) {
  let post;
  try {
    await connectToDatabase();
    post = await Post.findOne({ slug: postSlug });
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!post) {
    const error = new Error("Could not find cPosts for this id.");
    throw error;
  }
  const readTime = getReadTime(newContent);
  try {
    post.content = newContent;
    post.readTime = readTime;
    await post.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
}
export async function updatePostPublishStatus(
  postSlug: string,
  publishStatus: boolean
) {
  let post;
  try {
    await connectToDatabase();
    post = await Post.findOne({ slug: postSlug });
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!post) {
    const error = new Error("Could not find cPosts for this id.");
    throw error;
  }

  try {
    post.isPublished = publishStatus;
    await post.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
}
export async function updatePostYouTubeVideoId(
  postSlug: string,
  newVideoId: string
) {
  let post;
  try {
    await connectToDatabase();
    post = await Post.findOne({ slug: postSlug });
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!post) {
    const error = new Error("Could not find a post for this id.");
    throw error;
  }

  try {
    post.youtubeVideoId = newVideoId;
    await post.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
}
//* Updating functions 👆:

//* Deleting functions 👇:

export async function deletePostVideo(postSlug: string) {
  let post;
  try {
    await connectToDatabase();
    post = await Post.findOne({ slug: postSlug });
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!post) {
    const error = new Error("Could not find a post for this slug.");
    throw error;
  }

  try {
    post.youtubeVideoId = undefined;
    await post.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
}

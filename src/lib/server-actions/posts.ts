"use server";

import { connectToDatabase } from "@/lib/database/db-connection";
import Post from "../database/models/Post";
import { post } from "../types";
import { generateSlug } from "../utils/posts";
// import { revalidatePath } from "next/cache";

export async function getPosts(): Promise<post[]> {
  try {
    await connectToDatabase();
    const posts = (await Post.find().lean()) as post[];
    if (!posts) {
      throw new Error("There's not any results to return.");
    }
    // * If you only need to retrieve SOME properties of post objects from DB, this is how you can type the data in TypeScript. Pick<Type, Keys> is a built-in utility type in TypeScript that allows you to create a new type by selecting a set of properties from an existing type.
    // type PostTitleAndDescription = Pick<Post, 'title' | 'description'>;
    return posts;
  } catch (error) {
    console.log("This error happened when getting all the posts:", error);
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

// export async function updateCourse(courseId: string, newData: any) {
//   let result;
//   try {
//     await connectToDatabase();
//     result = await Course.findById(courseId);
//   } catch (error) {
//     console.log("This error happened while updating the data:", error);
//     throw error;
//   }

//   if (!result) {
//     const error = new Error("Could not find results for this id.");
//     throw error;
//   }

//   try {
//     console.log("newData", newData);

//     await result.updateOne({ _id: courseId }, newData);
//     // revalidatePath("/data");
//   } catch (error) {
//     console.log("This error happened while deleting the data:", error);
//     throw error;
//   }
// }
export async function updatePostTitle(postId: string, newTitle: string) {
  let post;
  try {
    await connectToDatabase();
    post = await Post.findById(postId);
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
export async function updatePostExcerpt(postId: string, newExcerpt: string) {
  let post;
  try {
    await connectToDatabase();
    post = await Post.findById(postId);
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
export async function updatePostContent(postId: string, newContent: string) {
  let post;
  try {
    await connectToDatabase();
    post = await Post.findById(postId);
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!post) {
    const error = new Error("Could not find cPosts for this id.");
    throw error;
  }

  try {
    post.content = newContent;
    await post.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
}
export async function updatePostPublishStatus(
  postId: string,
  publishStatus: boolean
) {
  let post;
  try {
    await connectToDatabase();
    post = await Post.findById(postId);
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
  postId: string,
  newVideoId: string
) {
  let post;
  try {
    await connectToDatabase();
    post = await Post.findById(postId);
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

export async function deletePostVideo(postId: string) {
  let post;
  try {
    await connectToDatabase();
    post = await Post.findById(postId);
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!post) {
    const error = new Error("Could not find a post for this id.");
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

import { NextResponse } from "next/server";
import { existsSync } from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/database/db-connection";
import Post from "@/lib/database/models/Post";
import { revalidatePath } from "next/cache";
import { rm } from "fs/promises";

export async function POST(req: Request) {
  try {
    const { postSlug } = await req.json();

    if (!postSlug) {
      return NextResponse.json(
        { error: "No post slug provided." },
        { status: 400 }
      );
    }
    // First delete the post object in database
    await connectToDatabase();
    const post = await Post.findOne({ slug: postSlug });
    if (!post) {
      throw new Error("There's not any results to return.");
    }
    try {
      await post.deleteOne();
    } catch (error) {
      console.log(
        "This error happened while deleting the post obeject in DB:",
        error
      );
      throw error;
    }
    // Next remove all the related files (image and attachments) from server
    const filesDir = path.join(process.cwd(), "uploads", "posts", postSlug);
    if (existsSync(filesDir)) {
      await rm(filesDir, { recursive: true, force: true });
    }
    revalidatePath("/admin/posts");

    return NextResponse.json({
      message: "Deleted the post in DB and related images in file system",
    });
  } catch (err) {
    console.error("Error deleting image(s):", err);
    return NextResponse.json(
      { error: "Failed to delete image(s)." },
      { status: 500 }
    );
  }
}

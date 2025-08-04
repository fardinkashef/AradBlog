import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/database/db-connection";
import Post from "@/lib/database/models/Post";

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
    // Next remove the image file(s) from server
    const imagesDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "images",
      "posts"
    );
    const files = fs.readdirSync(imagesDir);
    const matchingFiles = files.filter(
      (file) => path.parse(file).name === postSlug
    );

    if (matchingFiles.length === 0) {
      return NextResponse.json({ message: "No matching images found." });
    }

    matchingFiles.forEach((file) => {
      const filePath = path.join(imagesDir, file);
      fs.unlinkSync(filePath);
    });

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

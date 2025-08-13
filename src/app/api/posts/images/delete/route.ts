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
    // First update the post object in database
    await connectToDatabase();
    const post = await Post.findOne({ slug: postSlug });
    if (!post) {
      throw new Error("There's not any results to return.");
    }
    post.imageSrc = "";
    await post.save();
    // Next remove the image file(s) from server
    const imagesDir = path.join(process.cwd(), "uploads", "posts", postSlug);
    const files = fs.readdirSync(imagesDir);
    const matchingFiles = files.filter(
      (file) => path.parse(file).name === "Image"
    );

    if (matchingFiles.length === 0) {
      return NextResponse.json({ message: "No matching images found." });
    }

    matchingFiles.forEach((file) => {
      const filePath = path.join(imagesDir, file);
      fs.unlinkSync(filePath);
    });

    return NextResponse.json({
      message: `Deleted ${matchingFiles.length} image(s).`,
    });
  } catch (err) {
    console.error("Error deleting image(s):", err);
    return NextResponse.json(
      { error: "Failed to delete image(s)." },
      { status: 500 }
    );
  }
}

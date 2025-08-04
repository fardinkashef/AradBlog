import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/database/db-connection";
import Post from "@/lib/database/models/Post";

export async function POST(req: Request) {
  try {
    const { postSlug, fileName } = await req.json();

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
    post.attachments = post.attachments.filter(
      (attachment: string) => attachment !== fileName
    );
    await post.save();
    // Next remove the image file(s) from server
    const filesDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "files",
      "posts",
      postSlug
    );
    const files = fs.readdirSync(filesDir);
    const matchingFiles = files.filter((file) => file === fileName);

    if (matchingFiles.length === 0) {
      return NextResponse.json({ message: "No matching files found." });
    }

    matchingFiles.forEach((file) => {
      const filePath = path.join(filesDir, file);
      fs.unlinkSync(filePath);
    });

    return NextResponse.json({
      message: `Deleted ${matchingFiles.length} file(s).`,
    });
  } catch (err) {
    console.error("Error deleting file(s):", err);
    return NextResponse.json(
      { error: "Failed to delete file(s)." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/database/db-connection";
import Post from "@/lib/database/models/Post";

export async function POST(request: NextRequest) {
  try {
    // Only handle POST requests
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const postId = formData.get("postId") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "images",
      "posts"
    );
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Handle file name
    const fileExtension = path.extname(file.name);
    const newFilename = `${postId}${fileExtension}`;

    // Create the final path for the file
    const finalPath = path.join(uploadsDir, newFilename);

    // Convert file to buffer and save it
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write the file to the filesystem
    await writeFile(finalPath, buffer);

    // Generate the public URL for the image
    const imageSrc = `/uploads/images/posts/${newFilename}`;
    // Update the post object in database
    await connectToDatabase();
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("There's not any results to return.");
    }
    post.imageSrc = imageSrc;
    await post.save();
    // revalidatePath(`/admin/posts/${postId}`, "page");
    // Return success response
    return NextResponse.json({
      success: true,
      imageSrc,
      filename: newFilename,
      size: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

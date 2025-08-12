import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/database/db-connection";
import Post from "@/lib/database/models/Post";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const postSlug = formData.get("postSlug") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // A better approach for the upload directory, outside of `public`
    const uploadsDir = path.join(
      process.cwd(),
      "uploads", // Store in a dedicated 'uploads' folder
      "images",
      "posts"
    );

    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const fileExtension = path.extname(file.name);
    const newFilename = `${postSlug}${fileExtension}`;

    const finalPath = path.join(uploadsDir, newFilename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(finalPath, buffer);
    const imageSrc = `/api/posts/images/serve/uploads/images/posts/${newFilename}`;

    await connectToDatabase();
    const post = await Post.findOne({ slug: postSlug });
    if (!post) {
      // It's better to return an error than to throw it here
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    post.imageSrc = imageSrc;
    await post.save();

    return NextResponse.json({
      success: true,
      imageSrc: imageSrc,
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

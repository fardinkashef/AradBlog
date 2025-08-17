import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/database/db-connection";
import Post from "@/lib/database/models/Post";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[]; // This will be an array of File objects
    const postId = formData.get("postId") as string;

    // Corrected check: if no files were actually provided
    if (files.length === 0) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(
      process.cwd(),
      "uploads",
      "posts",
      postId,
      "attachments"
    );
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const newAttachments: string[] = [];

    // Use Promise.all to wait for all file operations to complete
    const uploadPromises = files.map(async (file: File) => {
      // Explicitly type 'file' as File
      if (!(file instanceof File)) {
        // Safety check: ensure it's a File object
        console.warn("Skipping non-File object in files array:", file);
        return null; // Or throw an error, depending on desired behavior
      }

      // Create the final path for the file
      const finalPath = path.join(uploadsDir, file.name);

      // Convert file to buffer and save it
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Write the file to the filesystem
      await writeFile(finalPath, buffer);

      // Return the filename to be pushed into newAttachments
      return file.name;
    });

    // Wait for all file upload promises to resolve
    const uploadedFileNames = await Promise.all(uploadPromises);

    // Filter out any nulls if the safety check returned null
    newAttachments.push(
      ...(uploadedFileNames.filter((name) => name !== null) as string[])
    );

    // Update the post object in database
    await connectToDatabase();
    const post = await Post.findById(postId);
    if (!post) {
      // You might want to handle this more gracefully, e.g., delete uploaded files
      throw new Error("There's not any results to return.");
    }

    // Ensure post.attachments is initialized as an array
    if (!post.attachments) {
      post.attachments = [];
    }
    post.attachments = [...post.attachments, ...newAttachments];
    await post.save();
    // revalidatePath(`/admin/posts/${postSlug}`, "page");

    // Return success response
    return NextResponse.json({
      success: true,
      uploadedFileNames: newAttachments, // Send back the names for client confirmation
      // size: file.size, // These are commented out, but good practice to remove if not used
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

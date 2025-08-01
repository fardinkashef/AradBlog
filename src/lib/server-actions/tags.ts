"use server";

import { connectToDatabase } from "@/lib/database/db-connection";
import Tag from "../database/models/Tag";
// import { revalidatePath } from "next/cache";

export async function getTags() {
  try {
    await connectToDatabase();
    const tags = await Tag.find().lean();
    if (!tags) {
      throw new Error("There's not any results to return.");
    }
    return tags;
  } catch (error) {
    console.log("This error happened when getting all the tags:", error);
    throw error;
  }
}

export async function createTag(name: string) {
  try {
    await connectToDatabase();
    const newTag = new Tag({ name });
    await newTag.save();
    return { success: true };
  } catch (error) {
    console.log("This error happened while creating new tag:", error);
    throw error;
  }
}
